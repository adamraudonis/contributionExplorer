


var pi=Math.PI;
var main_r=300;
var main_x=500
var main_y=400
var all_sectors=new Array();


function write_data(json){
    
    return json
    
}
    
    



    
    
    

function initialize(){
     
    var canvas = d3.select("#canvas")
                
    var colors=new Array();

    colors[0]="#e37e23";
    colors[1]="#619f3a";
    colors[2]="#4876b1";
    colors[3]="#c36929"

    var sector_x=0 
    var sector_y=0
        
        
    
    var data=get_data()
 
                    var selection = canvas.selectAll("circle").data(data);
                    
                    selection.enter().append("circle");
                    
                    selection
                        .attr("cx", main_x)
                        .attr("cy", main_y)
                        .attr("r", 20)
                        .attr("id", function(d){if(d.CID==undefined){return "no id"}else{return ("candidate_" + d.CID)} })
                        .attr("class", "candidate")
                        .attr("candidateName", function (d){return d.candidateName})
                        .attr("Agribusiness",function(d){ if (d.PACs.Agribusiness==undefined) { return 0} else{return d.PACs.Agribusiness} } )
                        .attr("Ideology_Single_Issue",function(d){if (d.PACs.Ideology_Single_Issue==undefined) { return 0} else{return d.PACs.Ideology_Single_Issue} } )
                        .attr("Construction",function(d){if (d.PACs.Construction==undefined) { return 0} else{return d.PACs.Construction} } )
                        .attr("Committee",function(d){if (d.PACs.Committee==undefined) { return 0} else{return d.PACs.Committee} } )
                        .attr("total_cash",function(d){
                            
                            var total=0
                            for(var j in d.PACs){
                            
                                var sector=d.PACs[j]
                                total=total+sector
                                
                                var old_sector=all_sectors[j]
                                if(old_sector==undefined){all_sectors[j]=0;}
                                all_sectors[j]=all_sectors[j]+sector

                            }
                            return total
                            
                        })
                        
                        
                   //my prototype to view data structure in console.     
                    console.log("ALL SECTORS")
                    console.log(all_sectors)
                    
                    
                    var obama=d3.select("#candidate_N00009638");
                    var obama_PACs=obama[0][0]["__data__"]["PACs"];
                    for(var i in obama_PACs){
                        
                        var PAC=obama_PACs[i];
                        console.log("PAC number "+i+" "+PAC)
                        
                    }
                    //end of prototype
                    
                    
              
              
                 /*Dummy Candidadates
                    //create candidates at position 0, 0
                    for (var i=0; i<num_of_candidates; i++){
                        
                    
                        
                        canvas.append("svg:circle")
                                        .attr("cx", main_x)
                                        .attr("cy", main_y)
                                        .attr("r", 20)
                                        .attr("class","candidate")
                                        .attr("id", "candidate_"+i)
                                        .attr("Agribusiness", all_spring_constants[i][0])
                                        .attr("Defense", all_spring_constants[i][1])
                                        .attr("Construction", all_spring_constants[i][2])
                        
               

                    } 
                    
                   */
                
                    var anchor_angles = new Array();
                
                    canvas.append("svg:circle")
                        .attr("cx", main_x)
                        .attr("cy", main_y)
                        .attr("r", main_r)
                        .attr("id", "main_circle")
                        
                        canvas.append("svg:circle")
                        .attr("cx", main_x)
                        .attr("cy", main_y)
                        .attr("r", 2)
                        .attr("id", "center")
                        .style("fill","grey")
                        
                    //sector 0
                    anchor_angles[0]=1/8*2*pi
                    canvas.append("svg:circle")
                        .attr("cx", main_x+main_r*Math.cos(anchor_angles[0]))
                        .attr("cy", main_y+main_r*Math.sin(anchor_angles[0]))
                        .attr("r", 20)
                        .style("fill", colors[0])
                        .attr("theta", anchor_angles[0])
                        .attr("id", "sector_0")
                        .attr("sector_name", "Agribusiness")
                        .on("mousedown", function(){  
                            motion_lock(this)
                        })
                        
                    //sector 1
                    anchor_angles[1]=3/8*2*pi
                    canvas.append("svg:circle")
                        .attr("cx", main_x+main_r*Math.cos(anchor_angles[1]))
                        .attr("cy", main_y+main_r*Math.sin(anchor_angles[1]))
                        .attr("r", 20)
                        .style("fill", colors[1])
                        .attr("theta", anchor_angles[1])
                        .attr("id", "sector_1")
                        .attr("sector_name", "Ideology_Single_Issue")
                        .on("mousedown", function(){  
                            motion_lock(this)
                        })
                        
                        
                    //sector 2
                    anchor_angles[2]=7/8*2*pi
                    canvas.append("svg:circle")
                        .attr("cx", main_x+main_r*Math.cos(anchor_angles[2]))
                        .attr("cy", main_y+main_r*Math.sin(anchor_angles[2]))
                        .attr("r", 20)
                        .style("fill", colors[2])
                        .attr("theta", anchor_angles[2])
                        .attr("id", "sector_2")
                        .attr("sector_name", "Construction")
                        .on("mousedown", function(){  
                            motion_lock(this)
                        })
                        
                    //sector 3
                    anchor_angles[3]=5/8*2*pi
                    canvas.append("svg:circle")
                        .attr("cx", main_x+main_r*Math.cos(anchor_angles[3]))
                        .attr("cy", main_y+main_r*Math.sin(anchor_angles[3]))
                        .attr("r", 20)
                        .style("fill", colors[3])
                        .attr("theta", anchor_angles[3])
                        .attr("id", "sector_3")
                        .attr("sector_name", "Committee")
                        .on("mousedown", function(){  
                            motion_lock(this)
                        })
               

                    
              var candidates=$(".candidate")
              
              
         
              
               for (var i=0;i<candidates.length;i++){
                
                var id=$(candidates[i]).attr("id")
               
                console.log("candidate: ")
                console.log($("#"+id))

                draw_candidates(id, canvas, colors, false)
               
               }
               
         
               
               
               
                for (var i=0;i<candidates.length;i++){       
                   //bring candidate circles above vectors
                   
                   var id=$(candidates[i]).attr("id")
                   var el=document.getElementById(id)
                   el.parentNode.appendChild(el)
                }
               
               
               mouse_tracker(canvas, colors)
    
    
}


function draw_candidates(candidate_id,  canvas, colors, redraw){
 
 
    var candidate=d3.select("#"+candidate_id)
    console.log(candidate.attr("candidateName"))

    var spring_constants=[
        
        candidate.attr("Agribusiness"),
        candidate.attr("Ideology_Single_Issue"),
        candidate.attr("Construction"),
        candidate.attr("Committee"),
        
        
    ]
    
    //code for each candidate
                        
                       //spring constant for one candidate     

                       //calculate x,y

                       var candidate_x=0;
                       var candidate_y=0;
                       var sum_k=0;
                       var sum_force_x=0;
                       var sum_force_y=0;

                       var pull_offset=29;

                       var x_i=0
                       var y_i=0
                       var k_i=0
 
       

                       for (var i=0;i<spring_constants.length;i++){

                          
                           var sector=$("#sector_"+i)
                           var sector_name=sector.attr("sector_name")
                           console.log("sector_name "+sector_name)
                           
                           x_i=main_x+(main_r-pull_offset)*Math.cos(sector.attr("theta"))
                           y_i=main_y+(main_r-pull_offset)*Math.sin(sector.attr("theta"))
                           
                           
                           k_i=parseFloat(spring_constants[i])
                           console.log("k_i "+k_i)
                           
                           sum_k=sum_k+k_i
                      
                          
                           sum_force_x=sum_force_x+k_i*x_i
                           sum_force_y=sum_force_y+k_i*y_i
                           
                           
                       }
                       
                       console.log("sum_k "+sum_k)
                       
                       if(sum_k!=0){
                           candidate_x=sum_force_x/sum_k;
                           candidate_y=sum_force_y/sum_k;
                       }
                       else{
                           
                           candidate_x=main_x;
                           candidate_y=main_y;
                           
                       }

                       // end of calculate x,y for candidate
               
                       
                       if(sum_k!=0){
                               //force vectors
                               var delta_x=0;
                               var delta_y=0;
                               var m=0;
                               var z=0;
                               var vector_max_length=50;
                               var max_stroke_width=10;
                               var d="";
                               var tension_fraction=0;
                               
                               candidate.attr("r", 20+sum_k/(20*100000))
                               

                               for (var i=0; i<spring_constants.length;i++){

                                   sector=$("#sector_"+i)
                                   sector_name=sector.attr("sector_name")
                                   k_i=parseFloat(spring_constants[i])

                                   x_i=main_x+(main_r)*Math.cos(sector.attr("theta"))
                                   y_i=main_y+(main_r)*Math.sin(sector.attr("theta"))
                                   
                                   console.log("downstream sector name "+sector_name)
                                   console.log("downstream k_i "+k_i)
                                   console.log("downstream sum_k "+sum_k)

                                   tension_fraction = k_i/sum_k;
                                   console.log("up next tension fraction")
                                   console.log("tension_fraction " +tension_fraction)
                                   delta_x=x_i-candidate_x;
                                   delta_y=y_i-candidate_y
                                   m=delta_y/delta_x

                                   z=tension_fraction*vector_max_length;


                                   d="M"+candidate_x+" "+candidate_y+" l"+delta_x+" "+delta_y;


                                  if(redraw==false){
                                  
                                  
                                 
                                  canvas.append("svg:path")
                                    .attr("d",d)
                                    .attr("id", "cand_"+candidate_id+"_vector_"+i)
                                    .style("stroke",colors[i])
                                    .style("stroke-width",0.2+0.8*(tension_fraction)*max_stroke_width)
                                    .style("opacity", 0.2+0.8*tension_fraction)
                                  }

                                  else{
                                      $("#cand_"+candidate_id+"_vector_"+i)
                                        .attr("d",d)

                                  }


                               }

                               //end of force vectors
                       }
                       
                       
                       //create candidate circles
                       
                       //var el=document.getElementById("candidate_"+candidate_id)
                      
                       
                           candidate
                           .attr("cx", parseFloat(candidate_x))
                           .attr("cy", parseFloat(candidate_y))
                           
                      
                      //el.parentNode.appendChild(el)
                       
                       //end of create candidate circle
                       
                       
                   //end of code for each candidate
    
    
    
}


     

function mouse_tracker(canvas, colors){
                
 
                var mouse_x=0;
                var mouse_y=0;
                var mouse_r=0;
                
                var mie = (navigator.appName == "Microsoft Internet Explorer")?true:false;
                    if (!mie)
            
                    {
                        document.captureEvents(Event.MOUSEMOVE); // Specifies that you want all mouse movement events passed to the document
                        document.captureEvents(Event.MOUSEDOWN);
                        document.captureEvents(Event.MOUSEUP);
                    }  
                
                document.onmousemove = function(event){
                    
                    var current_mouse_x=$("#mouse_x").html();
                    var current_mouse_y=$("#mouse_y").html();
                    
                    mouse_x = event.pageX;
  	            mouse_y = event.pageY;
    
     
                    $('#mouse_x').html(mouse_x)
                    $('#mouse_y').html(mouse_y)
         
                     var correction=9
                     var delta_xc=mouse_x-main_x-correction
                     var delta_yc=mouse_y-main_y-correction
                     var r=Math.sqrt(Math.pow(delta_xc,2)+Math.pow(delta_yc, 2))

                     var theta=Math.acos(delta_xc/r)
                     
                     if(delta_yc<0){
                         theta=2*Math.PI-theta;   
                     }

                     $("#theta").html(theta)
                     $("#mouse_r").html(r)
                     var target_name=$('#target').html();
                    
                    if(target_name!=""){
                         
                         var target=$('#'+target_name)
                         
                         target.attr("cx", main_x+main_r*Math.cos(theta))
                         target.attr("cy", main_y+main_r*Math.sin(theta))
                         target.attr("theta", theta)
                         
                         
                         var candidates=$(".candidate")
                    
                           for (var i=0;i<candidates.length;i++){       

                            var id=$(candidates[i]).attr("id")
                            draw_candidates(id, canvas, colors, true)

                         }

                         
                    }                                    
                };
                
                document.onmouseup = function (event){
                    
                    $('#target').html("")
                    
                }
                
         
}

function motion_lock(target){
    
    var target=$(target)
    
    
    $("#target").html(target.attr("id"))
 
  
    
}

