


var pi=Math.PI;
var main_r=300;
var main_x=500
var main_y=400
var all_sectors=new Array();
var sector_count=0;
var max_sector=0;
function write_data(json){
    
    return json
    
}
    
    



    
    
    

function initialize(){
     
     
    var canvas = d3.select("#canvas")
                
    var colors=new Array();

    colors[0]="#e37e23"
    colors[1]="#619f3a"
    colors[2]="#4876b1"
    colors[3]="#c36929"
    colors[4]="#8dd3c7"
    colors[5]="#ffffb3"
    colors[6]="#bebada"
    colors[7]="#fb8072"
    colors[8]="#80b1d3"
    colors[9]="#fdb462"
    colors[10]="#b3de69"
    colors[11]="fccde4"
    colors[12]="#d9d9d9"
    colors[13]="#bc80bd"
    colors[14]="#ccebc6"
    colors[15]="#ffed6f"
    
    var colors_assigned=new Array();

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
                        .attr("class", "candidate cand_unlocked")
                        .attr("candidateName", function (d){return d.candidateName})
                        .style("fill", function(d){
                            
                                        var party=d.Party

                                        if(party=="D"){return "blue"}
                                        else if(party=="R"){return "red"}
                                        else{return "green"}

                                    }
                               )
                        .attr("total_cash",function(d){
                            
                            var total=0
                            for(var j in d.PACs){
                            
                                var sector=d.PACs[j]
                                total=total+sector
                                
                                var old_sector=all_sectors[j]
                                if(old_sector==undefined){all_sectors[j]=0; sector_count++;}
                                all_sectors[j]=all_sectors[j]+sector

                            }
                            return total
                            
                        })
                        
                           
                    var i=0;   
                    for (var j in all_sectors){
                        
                        colors_assigned[j]=colors[i]
                        
                        if(all_sectors[j]>max_sector){max_sector=all_sectors[j]}
                        
                        
                        i++
                    }    
                    
              
                        
                   //my prototype to view data structure in console.     
                   
                    console.log("all sectors")
                    console.log(all_sectors)
                    console.log("everyone")
                    console.log(selection)
                    var obama=d3.select("#candidate_N00009638");
                    var obama_PACs=obama[0][0]["__data__"]["PACs"];
                    for(var i in obama_PACs){
                        
                        var PAC=obama_PACs[i];
              
                    }
                    //end of prototype
                    
                    
              
   
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
                        
                        
                    
                    //create sectors
                    var i=0;
                    var anchor_angle=0
                    var x=0
                    var y=0
                    var bar_size=0
                    var d="";
                    var angle_segment=sector_count+1
                    
                    for (var j in all_sectors){
                        
                        bar_size=15+all_sectors[j]/max_sector*300
                        anchor_angle=i/angle_segment*2*pi;
                        x=main_x+main_r*Math.cos(anchor_angle)
                        y=main_y+main_r*Math.sin(anchor_angle)
 
                        d="M"+x+" "+y+ " l"+bar_size*Math.cos(anchor_angle)+ " "  + bar_size*Math.sin(anchor_angle) 
                        
                        canvas.append("svg:path")
                            .attr("d", d)
                            .attr("class","sector_bar")
                            .attr("id", "sector_bar_"+j)
                            .attr("sector_name", j)
                            .attr("size", bar_size)
                            .style("stroke", colors_assigned[j])
                            .on("mousedown", function(){  
                                
                                motion_lock(this)
                            })
                            
                        canvas.append("svg:circle")
                            .attr("cx", x)
                            .attr("cy", y)
                            .attr("r", 20)
                            .style("fill", colors_assigned[j])
                            .attr("class", "sector_circle")
                            .attr("theta", anchor_angle)
                            .attr("id", "sector_"+j)
                            .attr("sector_name", j)
                            .on("mousedown", function(){  
                                
                                motion_lock(this)
                            })  
                            
                           
                            i++
                    }
                    
  

                    
              var candidates=$(".candidate")
              
              
               for (var i=0;i<candidates.length;i++){
                
                var id=$(candidates[i]).attr("id")
 
                draw_candidates(id, canvas, colors_assigned, false)
               
               }
               

               
                for (var i=0;i<candidates.length;i++){       
                   //bring candidate circles above vectors
                   
                   var id=$(candidates[i]).attr("id")
                   var el=document.getElementById(id)
                   el.parentNode.appendChild(el)
                }
               
               
               mouse_tracker(canvas, colors_assigned)
               
               
               
               
               canvas.append("svg:circle")
                        .attr("cx", main_x)
                        .attr("cy", main_y)
                        .attr("r", main_r)
                        .attr("id", "main_circle")
                        .on("mousedown",function(){
                            
                            remove_selection()
                                
                            
                            $("#select_status").html("true")
                            
                            var mouse_x=$("#mouse_x").html()
                            var mouse_y=$("#mouse_y").html()
                            var width=1
                            var height=1
                            
                            var d="M"+mouse_x+" "+mouse_y+" l"+width+" 0 l0 "+height+" h-"+width+" 0 v0 -"+height
                            

                            canvas.append("svg:path")
                                .attr("id","selection_rect")
                                .attr("d",d)
                            $("#select_point_1_x").html(mouse_x)
                            $("#select_point_1_y").html(mouse_y)  
                                
                            
                        })
                        
                    
                        
                        canvas.append("svg:circle")
                        .attr("cx", main_x)
                        .attr("cy", main_y)
                        .attr("r", main_r)
                        .attr("id", "main_circle_outline")
                        .style("fill","none")
                        .style("stroke","grey")
                        .style("stroke-width", 1)
                        
                        canvas.append("svg:circle")
                        .attr("cx", main_x)
                        .attr("cy", main_y)
                        .attr("r", 2)
                        .attr("id", "center")
               
               
               
               
    
    
}


function draw_candidates(candidate_id,  canvas, colors_assigned, redraw){
 
 
    var candidate=d3.select("#"+candidate_id)
    
    //code for each candidate
                        
                       //spring constant for one candidate     

                       //calculate x,y

                       var candidate_x=0;
                       var candidate_y=0;
                       var sum_k=0;
                       var sum_force_x=0;
                       var sum_force_y=0;

                       var pull_offset=70;

                       var x_i=0
                       var y_i=0
                       var k_i=0
 
       
                    
                       if(candidate.attr("total_cash")>0){sum_k=candidate.attr("total_cash")}
            
                       if(sum_k!=0){
                           
                           var candidate_sectors=candidate[0][0]["__data__"]["PACs"];
                           for (var j in candidate_sectors){
                          
                               var sector=$("#sector_"+j)
                               var sector_name=j
                        

                               x_i=main_x+(main_r-pull_offset)*Math.cos(sector.attr("theta"))
                               y_i=main_y+(main_r-pull_offset)*Math.sin(sector.attr("theta"))


                               k_i=parseInt(candidate_sectors[j])
                    
                               

                               sum_force_x=sum_force_x+k_i*x_i
                               sum_force_y=sum_force_y+k_i*y_i
                               
                
                          
                           }
                           
                  
                           candidate_x=sum_force_x/sum_k;
                           candidate_y=sum_force_y/sum_k;
                           
                    
                           
                           //force vectors
                               var delta_x=0;
                               var delta_y=0;
                               var m=0;
                       
                               var max_stroke_width=15;
                               var d="";
                               var tension_fraction=0;
                               
                               candidate.attr("r", 20+sum_k/(20*100000))
                               
                               var i=0;
                               for (var j in candidate_sectors){

                                   sector=$("#sector_"+j)
                                   sector_name=j
                                   if(parseInt(candidate_sectors[j])>0){
                                       k_i=parseInt(candidate_sectors[j])
                                   }
                                   else{
                                       k_i=0
                                   }

                                   x_i=main_x+(main_r)*Math.cos(sector.attr("theta"))
                                   y_i=main_y+(main_r)*Math.sin(sector.attr("theta"))
                                   
                               
                                   tension_fraction = k_i/sum_k;
                           
                                   
                                   delta_x=x_i-candidate_x;
                                   delta_y=y_i-candidate_y
                                   m=delta_y/delta_x

                           


                                   d="M"+candidate_x+" "+candidate_y+" l"+delta_x+" "+delta_y;


                                  if(redraw==false){
                                  
                                 
                                 
                                  canvas.append("svg:path")
                                    .attr("d",d)
                                    .attr("id", "cand_"+candidate_id+"_vector_"+j)
                                    .style("stroke",colors_assigned[j])
                                    .style("stroke-width",0.3+0.7*(tension_fraction)*max_stroke_width)
                                    .style("opacity", 1+0*tension_fraction)
                                    
                                    // 
                                  }

                                  else{
                                      $("#cand_"+candidate_id+"_vector_"+j)
                                        .attr("d",d)

                                  }

                                  i++
                               }

                               //end of force vectors
                           
                           
                           
                           
                           
                           
                           
                           
                           
                            
                       }
                       
                       else{
                           candidate_x=main_x;
                           candidate_y=main_y;
                           
                       }
                       
                      
                       // end of calculate x,y for candidate
               
              
                       
                       //create candidate circles
                       
                       //var el=document.getElementById("candidate_"+candidate_id)
                      
                       
                           candidate
                           .attr("cx", parseFloat(candidate_x))
                           .attr("cy", parseFloat(candidate_y))
                           
                      
                      //el.parentNode.appendChild(el)
                       
                       //end of create candidate circle
                       
                       
                   //end of code for each candidate
    
    
    
}


     

function mouse_tracker(canvas, colors_assigned){
                
 
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
                   
                    track_selection()
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
                     
                    var target_name="sector_"+$('#target').html();
                    var new_x=0
                    var new_y=0
                    var d=""
                    
                    
                    if(target_name!=""){
                         
                         var target=$('#'+target_name)
                         new_x=main_x+main_r*Math.cos(theta)
                         new_y=main_y+main_r*Math.sin(theta)
                         
                         target.attr("cx", new_x)
                         target.attr("cy", new_y)
                         target.attr("theta", theta)
                         
                         var target_bar=$("#sector_bar_"+$('#target').html())
                         var target_bar_size=target_bar.attr("size")
                         d="M"+new_x+" "+new_y+" l"+target_bar_size*Math.cos(theta)+" "+target_bar_size*Math.sin(theta)
                         target_bar.attr("d",d)
                                                  
                         
                         var candidates=$(".candidate")
                    
                           for (var i=0;i<candidates.length;i++){       

                            var id=$(candidates[i]).attr("id")
                            draw_candidates(id, canvas, colors_assigned, true)

                         }

                         
                    }                                    
                };
                
                document.onmouseup = function (event){
                    if($("#select_status").html()=='true'){
                        finish_selection()
                    }
                    $('#target').html("")
                }
                
                
                
         
}

function motion_lock(target){
    
  
    console.log($(target).attr("sector_name"))
    
    $("#target").html($(target).attr("sector_name"))
  
    
}

function between(x, min, max) {
  return x > min && x < max;
}

function track_selection(){
                            var select_status=$("#select_status").html()
                            if(select_status=="true"){
                                var mouse_x=$("#mouse_x").html()
                                var mouse_y=$("#mouse_y").html()

                                var origin_x=$("#select_point_1_x").html()
                                var origin_y=$("#select_point_1_y").html()

                                var width=mouse_x-origin_x
                                var height=mouse_y-origin_y
                                
                                var d="M"+origin_x+" "+origin_y+" l"+width+" 0 l0 "+height+" h"+(-1*width)+" 0 v0 "+(-1*height)

                                var selection_rect=d3.select("#selection_rect")
                               
                                selection_rect.attr("d",d)



                                
                            
                            }
                             
}

function finish_selection(){
                            
                            $("#select_status").html("false")
                            
                            $("#selection_list").html("")
                            
                            /*
                            var list_items=$("#selection_list").children()
                            
                            for (var i=0;i<list_items.length;i++){
                                
                               if($(list_items[i]).attr("locked")=='false'){
                                   $(list_items[i]).remove()
                                   
                               }  
                            }
                            */
                               
                                var x_1=$("#select_point_1_x").html()
                                var x_2=$("#mouse_x").html()
                                var min_x=0
                                var max_x=0

                                if(x_1<x_2){min_x=x_1; max_x=x_2}
                                else {min_x=x_2; max_x=x_1}

                                var y_1=$("#select_point_1_y").html()
                                var y_2=$("#mouse_y").html()
                                var min_y=0
                                var max_y=0
                                
                                if(y_1<y_2){min_y=y_1; max_y=y_2}
                                else {min_y=y_2; max_y=y_1}
                                
                                var width=max_x-min_x
                                var height=max_y-min_y
                            
                                if(width<2 || height < 2){
                                    
                                    
                                    remove_selection()
                                    
                                }
                                else{
                                    

                                    var candidates=$(".candidate")
                                    var candidate="";
                                    var cx=0, cy=0, cand_id="", name="", d3_candidate="";
                                    var div_function=""
                                  

                                    for(var i=0;i<candidates.length;i++){

                                        candidate=$("#"+candidates[i].id)
                                        d3_candidate=d3.select("#"+candidates[i].id)
                                        cx=candidate.attr("cx")
                                        cy=candidate.attr("cy")
                                        cand_id=candidate.attr("id")
                                        name=d3_candidate[0][0]["__data__"]["candidateName"]
                                        console.log(name)

                                        if((between(cx,min_x,max_x)) && (between(cy, min_y, max_y))){

                                            candidate.css("stroke", "orange")
                                            candidate.css("stroke-width", 4)
                                           
                                            $("#selection_list").append("<div locked='false' onclick=lock_candidate(this) id=list_"+ cand_id+" for="+cand_id+" onmouseover=highlight_this(this) onmouseout=lowlight_this(this)>"+name+"</div>")
                                                

                                          
                                        }
                                    }
                                }
                            
                            
}

function lock_candidate(target){
    var candidate=""
    if($(target).attr("locked")=='false'){
        $(target).attr("locked", 'true')
        $(target).attr("class", "locked_text")
        candidate=$(target).attr("for")
        
        $("#"+candidate).css("stroke", "#4900b6")
        $("#"+candidate).attr("class", "candidate cand_locked")
        $("#"+candidate).css("opacity", 1)
        
    }
    else{
        
        $(target).attr("locked", 'false')
        $(target).attr("class","")
        candidate=$(target).attr("for")
        $("#"+candidate).attr("class", "candidate cand_unlocked")
        $("#"+candidate).css("opacity", 0.1)
        
    }
    
}


function highlight_this(target){
   
   var target_circle=$(target).attr("for")
   
    $(".cand_unlocked").css("opacity",0.1)
    $("#"+target_circle).css("opacity", 1)
    
    
    if($(target).attr("locked")=="true") {return;}
    
    
    $(target).attr("class", "highlighted_text")
    
    
}

function lowlight_this(target){
    

    
    var target_circle=$(target).attr("for")
    
    
    /*
     *var candidates=$(".candidate")
     *var party="", id="", color="";
    for (var i=0;i<candidates.length;i++){
        
        party=candidates[i]['__data__']['Party']
        id="candidate_"+candidates[i]['__data__']['CID']
        if(party=="R"){color="red"}
        else if(party=="D"){color="blue"}
        else{color="green"}

       
        $("#"+id).css("fill", color)
        
    }*/
    
    $(".cand_unlocked").css("opacity", 0.25)
    
    
   if($(target).attr("locked")=="true") {return;}
   
   $(target).attr("class", 'lowlighted_text')
     
    

    
}

function remove_selection(){
    
     $("#selection_rect").remove()
     
    
    
     $(".cand_locked").attr("class", "candidate cand_unlocked")
     
     $(".candidate")
            .css("stroke", "black")
            .css("stroke-width", 1.5)
            .css("opacity", 0.25)

    var candidates=$(".candidate")
    var party="", id="", color="";
    
    /*
    for (var i=0;i<candidates.length;i++){
        
        party=candidates[i]['__data__']['Party']
        id="candidate_"+candidates[i]['__data__']['CID']
        if(party=="R"){color="red"}
        else if(party=="D"){color="blue"}
        else{color="green"}

       
        $("#"+id).css("fill", color)
        
    }
    */
    
}


