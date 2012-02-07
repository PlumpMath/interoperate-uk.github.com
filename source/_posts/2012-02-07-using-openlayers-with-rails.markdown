---
layout: post
title: "Using OpenLayers with Rails"
date: 2012-02-07 09:20
comments: true
categories: 
- Rails
- OpenLayers
- GeoJSON
- GIS
---
Over the last few years, I've worked on a few projects that have required the need to display information on a map.  Typically a polyline (or linestring) depicting a journey made by car.  I have previously used Google Maps and interacted directly with the Google Maps API.  However I don't like being tied into a single mapping provider and wanted the ability to easily switch between providers if required.  [OpenLayers](http://openlayers.org) allows you to do this.  I'm using Rails and wanted an easy way of storing geodata in a database and have it displayed on a map by [OpenLayers](http://openlayers.org).  Here's what I ended up with.
<!-- More -->
## Serving up the geodata in Rails
I'm using Postgres for my main Rails database but I'm also using file based SQLite databases to store datasets of GPS data.  For simplicity, I have a single table called 'gps' with fields called 'datetime,lat,lon,speed'.  My data is generally broken down into 'trips' so I have separate files for each trip.

```
sqlite> .schema
CREATE TABLE gps (datetime TEXT,lat REAL,lon REAL,speed REAL);

sqlite> SELECT * FROM gps LIMIT 5;
2012-02-03 11:15:07.000|53.858473|-1.42572|0.138
2012-02-03 11:15:08.000|53.858473|-1.42572|1.3
2012-02-03 11:15:09.000|53.858477|-1.425728|3.234
2012-02-03 11:15:10.000|53.858487|-1.42575|6.318
2012-02-03 11:15:11.000|53.858505|-1.425785|9.045
```

So, I want this data to be served up by Rails to [OpenLayers](http://openlayers.org) in a format that it can understand.  I decided that the easiest way to do this was to use the [GeoJSON](http://geojson.org) format as I could just create a 'trip' as a Ruby Hash object and then use Rails format to serve it up as a JSON object. So in my Trip model I defined a 'geojson' method that will return a Hash with the same structure as a [GeoJSON](http://geojson.org) 'FeatureCollection' object:

``` ruby trip.rb
class Trip < ActiveRecord::Base

  def geojson
    filename = File.join(Rails.root,'mydata.db')
    db = SQLite3::Database.new(filename)
    sql = "SELECT datetime,lon,lat FROM gps ORDER BY datetime ASC;"
    
    coordinates = []
    db.execute(sql) do |row|
      coordinates << [ row[1],row[2] ]
    end
    
    # return a GeoJSON 'FeatureCollection' 
    { :type => "FeatureCollection",
      :features => [
        :geometry => {
          :type => "GeometryCollection",
          :geometries => [
            { :type => "LineString", :coordinates => coordinates }
          ]
        }
      ]
    } 
  end
  
end
```

In my controller, I can then just serve up the @trip.geojson Hash as JSON using Rails's built in json renderer

``` ruby trips_controller.rb
class TripsController < ApplicationController
  
  def show
    @trip = Trip.find(params[:id])
    respond_to do |format|
      #format.html # show.html.erb
      format.json { render json: @trip.geojson }
    end
  end
  
end
```

Pointing my browser at http://localhost:3000/trips/1.json will now serve up the JSON file as follows:

``` javascript http://localhost:3000/trips/1.json
{
  type: "FeatureCollection",
  features: [
    {
      geometry: {
        type: "GeometryCollection",
        geometries: [
          {
            type: "LineString",
            coordinates: [
              [ -1.425713, 53.858375 ],
              [ -1.425713, 53.858375 ],
              [ -1.425713, 53.858373 ],
              [ -1.425712, 53.858373 ],
              [ -1.425712, 53.858372 ]
            ]
          }
        ]
      }
    }
  ]
}
```
## Generating the Map

The next thing that I needed to do was to get a basic map up and running with OpenLayers.  There were also some other features that I wanted:

1. To be able to switch between various base layers via a controller on the map:

    A. OpenStreetMaps
    B. Google Maps (Roads)
    C. Google Maps (Terrain)
  
2. To be able to style the linestring.

3. To be able to automatically set the center of the map and a sensible zoom level when the page is loaded.

It took me a few hours digging through the OpenLayers API spec and Google to find all the answers but in the end I ended up with this.  The hardest parts were understanding the different projections and working out how the features are returned by the OpenLayers.Format.GeoJSON.read function so that they can be iterated over to set the bounds.

``` javascript openlayers.js
var map;

function initializeMap() {
  // This function is called by the body onload() event in the view
  
  // Define a new map.  We want it to be loaded into the 'map_canvas' div in the view
  map = new OpenLayers.Map('map_canvas');

  // Add a LayerSwitcher controller
  map.addControl(new OpenLayers.Control.LayerSwitcher());

  // OpenStreetMaps
  var osm = new OpenLayers.Layer.OSM();

  // Google Maps (ROAD)
  var gmap = new OpenLayers.Layer.Google(
    "Google Maps",
    { type: google.maps.MapTypeId.ROAD }
   );
  
  // Google Maps (SATELLITE)
  var gsat = new OpenLayers.Layer.Google(
    "Google Satellite",
    { type: google.maps.MapTypeId.SATELLITE }
  );
  
  // Add the layers defined above to the map  
  map.addLayers([osm, gmap, gsat]);
   
  // Set some styles 
  var myStyleMap = new OpenLayers.StyleMap({
    'strokeColor': 'magenta',
    'strokeOpacity': 1.0,
    'strokeWidth': 2
  });
  
  // Create a new vector layer including the above StyleMap
  var vectorLayer = new OpenLayers.Layer.Vector(
    "Trip",
    { styleMap: myStyleMap }
  );     
  map.addLayer(vectorLlayer);
       
  // Get the polylines from Rails
  var url = "/trips/1.json"
  OpenLayers.loadURL(url, {}, null, function (response){
    var geojson_format = new OpenLayers.Format.GeoJSON({
      'internalProjection': new OpenLayers.Projection("EPSG:900913"),
      'externalProjection': new OpenLayers.Projection("EPSG:4326")
    });
    
    //Read the GeoJSON
    var features = geojson_format.read(response.responseText,"FeatureCollection");
    
    var bounds;
   
    if(features) {
      if(features.constructor != Array) {
        features = [features];
      }
      
      // Iterate over the features and extend the bounds to the bounds of the geometries
      for(var i=0; i<features.length; ++i) {
        if (!bounds) {
          bounds = features[i].geometry.getBounds();
        } else {
          bounds.extend(features[i].geometry.getBounds());
        }
      }
      
      // Add features to the 'vectorLayer'
      vectorLayer.addFeatures(features);
      
      // Set the extent of the map to the 'bounds'
      map.zoomToExtent(bounds);
    }  
  });
}
```

I've included screenshots below.  Note how the map has been centered on the geometry of the linestring and a sensible zoom level has been set.

{% img /images/openstreetmap.jpg "OpenStreetMap" "OpenStreetMap" %}
{% img /images/google_roads.jpg "Google Maps (ROAD)" "Google Maps Road" %}
{% img /images/google_satellite.jpg "Google Maps (Satellite)" "Google Maps Satellite" %}


