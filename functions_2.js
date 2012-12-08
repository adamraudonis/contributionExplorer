function initialize(){

    var canvas = d3.select("#canvas")
                
                var colors=new Array();
                
                colors[0]="#e37e23";
                colors[1]="#619f3a";
                colors[2]="#4876b1";
                
                    var sector_x=0 
                    var sector_y=0
                    var pi=Math.PI;
                    var main_r=300;
                    var main_x=500
                    var main_y=400
                
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
                        .style("fill","black")
                        
                    //sector 0
                    anchor_angles[0]=1/8*2*pi
                    canvas.append("svg:circle")
                        .attr("cx", main_x+main_r*Math.cos(anchor_angles[0]))
                        .attr("cy", main_y+main_r*Math.sin(anchor_angles[0]))
                        .attr("r", 20)
                        .style("fill", colors[0])
                        .attr("theta", anchor_angles[0])
                        .attr("id", "sector_0")
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
                        .on("mousedown", function(){  
                            motion_lock(this)
                        })
                        
               for (var i=0;i<1;i++){       
                
                draw_candidates(i, canvas, colors, main_x, main_y, main_r, false)
               
               }

               mouse_tracker(canvas, colors, main_x, main_y, main_r)
    
    
}


function draw_candidates(candidate_id, canvas, colors, main_x, main_y, main_r, redraw){
    

    
    //code for each candidate
                        
                       //spring constant for one candidate     
                       var spring_constants=new Array();

                       spring_constants[0]=40
                       spring_constants[1]=10
                       spring_constants[2]=70

                       
                       
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
 
       

                       for (var i=0;i<3;i++){

                           
                           var sector=$("#sector_"+i)
                           
                           x_i=main_x+(main_r-pull_offset)*Math.cos(sector.attr("theta"))
                           y_i=main_y+(main_r-pull_offset)*Math.sin(sector.attr("theta"))
                           k_i=spring_constants[i]
                           sum_k=sum_k+k_i


                           sum_force_x=sum_force_x+k_i*x_i
                           sum_force_y=sum_force_y+k_i*y_i
                           
                           
                       }

                       candidate_x=sum_force_x/sum_k;
                       candidate_y=sum_force_y/sum_k;

                       // end of calculate x,y for candidate
               
                       
                       
                       //force vectors
                       var delta_x=0;
                       var delta_y=0;
                       var m=0;
                       var z=0;
                       var vector_max_length=50;
                       var max_stroke_width=20;
                       var d="";
                       var tension_fraction=0;
                       var length_fraction=0;
                       
                       
                       
                       for (var i=0; i<3;i++){
                           
                           var sector=$("#sector_"+i)
                           
                           x_i=main_x+(main_r)*Math.cos(sector.attr("theta"))
                           y_i=main_y+(main_r)*Math.sin(sector.attr("theta"))
                           k_i=spring_constants[i]
                           
                           tension_fraction=k_i/sum_k;
                           
                           delta_x=x_i-candidate_x;
                           delta_y=y_i-candidate_y
                           m=delta_y/delta_x
                           
                           z=tension_fraction*vector_max_length;
                          
                         
                           length_fraction=z/Math.sqrt(Math.pow(delta_x,2)+Math.pow(delta_y,2))
                          
                  
                          
                           length_fraction=1 //remove this line to show effects of length
                          
                          //vectors
                          
                           d="M"+candidate_x+" "+candidate_y+" l"+length_fraction*delta_x+" "+length_fraction*delta_y;
                          if(redraw==false){
                             
                          canvas.append("svg:path")
                            .attr("d",d)
                            .attr("id", "cand_"+candidate_id+"_vector_"+i)
                            .style("stroke",colors[i])
                            .style("stroke-width",(tension_fraction)*max_stroke_width)
                            .style("opacity", tension_fraction)
                          }
                          
                          else{
                              $("#cand_"+candidate_id+"_vector_"+i)
                                .attr("d",d)
                              
                          }
    
                           
                       }
                                
                       //end of force vectors
                       
                     
                       if(redraw==false){
                       //create candidate circle
                       canvas.append("svg:circle")
                        .attr("cx", candidate_x)
                        .attr("cy", candidate_y)
                        .attr("r", 20)
                        .attr("class","candidate-R")
                        .attr("id", "candidate_"+candidate_id)
                        
                       }
                       else{
                           
                           $("#candidate_"+candidate_id)
                           .attr("cx", candidate_x)
                           .attr("cy", candidate_y)
                           
                       }
                       
                       


                       //end of create candidate circle
                       
                       
                   //end of code for each candidate
    
    
    
}


     

function mouse_tracker(canvas, colors, main_x,main_y, main_r){
                
 
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
                         
                         
                         for (var i=0;i<1;i++){
                            draw_candidates(i, canvas, colors, main_x, main_y, main_r, true)
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

