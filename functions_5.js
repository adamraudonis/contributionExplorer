

var all_spring_constants=[

                          [1,1,1],    //Agribusiness, Defense, Construction
                          [10,10,15],
                          [3,3,15],
                          [30,400,10],
                          [10,25,35],
                          [5,4,3]
                          
                         ]


var num_of_candidates=all_spring_constants.length

var pi=Math.PI;
var main_r=300;
var main_x=500
var main_y=400


function write_data(json){
    
    return json
    
}
    
    



    
    
    

function initialize(){
     
    var canvas = d3.select("#canvas")
                
    var colors=new Array();

    colors[0]="#e37e23";
    colors[1]="#619f3a";
    colors[2]="#4876b1";

    var sector_x=0 
    var sector_y=0
        
        
    
    var data=get_data()
    
    console.log("data "+data)
    
    
    var test=data[0].candidateNamef;
    
    if (test==undefined){
        
        test="none found"
    }
    
    console.log(test)
    
    
                    
                    
                    var selection = canvas.selectAll("circle").data(data);
                    
                    selection.enter().append("circle");
                    
                    selection
                        .attr("cx", main_x)
                        .attr("cy", main_y)
                        .attr("r", 20)
                        .attr("id", function(d){if(d.CID==undefined){return "no id"}else{return ("candidate_" + d.CID)} })
                        .attr("class", "candidate")
                        .attr("candidateName", function (d){return d.candidateName})
                        .attr("Agribusiness",function(d){if (d.PACs.Agribusiness==undefined) { return 0} else{return d.PACs.Agribusiness} } )
                        
                    
                    
               
              
              
              
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
               
                   
              
              /*
              var candidates=$(".candidate")
                    
                    console.log(candidates)
                    
                    for(var j=0;j<candidates.length;j++){
                        
                        
                       console.log(candidates[j].id)
                       
                       $("#"+candidates[j].id).css("fill", "black")
                        
              }
              
              */
                    
              
                    
               for (var i=0;i<num_of_candidates;i++){       
                
                
                draw_candidates(i, canvas, colors, false)
               
               }
               
               
                for (var i=0;i<num_of_candidates;i++){       
                   //bring candidate circles above vectors
                   var el=document.getElementById("candidate_"+i)
                   el.parentNode.appendChild(el)
                }
               

               mouse_tracker(canvas, colors)
    
    
}


function draw_candidates(candidate_id,  canvas, colors, redraw){
 
 
    var candidate=d3.select("#candidate_"+candidate_id)

    var spring_constants=[
        
        candidate.attr("Agribusiness"),
        candidate.attr("Defense"),
        candidate.attr("Construction"),
        
        
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
 
       

                       for (var i=0;i<3;i++){

                          
                           var sector=$("#sector_"+i)
                           
                           x_i=main_x+(main_r-pull_offset)*Math.cos(sector.attr("theta"))
                           y_i=main_y+(main_r-pull_offset)*Math.sin(sector.attr("theta"))
                           k_i=parseFloat(spring_constants[i])
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
                          
                         
                         
                          
                          //vectors
                          
                           d="M"+candidate_x+" "+candidate_y+" l"+delta_x+" "+delta_y;
                           
                           
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
                       
                       
                       
                       //create candidate circles
                       var el=document.getElementById("candidate_"+candidate_id)
                      
                       
                           candidate
                           .attr("cx", parseFloat(candidate_x))
                           .attr("cy", parseFloat(candidate_y))
                           
                      
                      el.parentNode.appendChild(el)
                       
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
                         
                    
        
                         for (var i=0;i<num_of_candidates;i++){
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

