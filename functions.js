var pi=Math.PI;
var main_r=300;
var main_x=500
var main_y=400
// =======
// var main_x=550 //mouse x is 601
// var main_y=400 //mouse y is 463
// >>>>>>> 9a2df7e3620e86b461fed16c2138aff3ff3cc127
var all_sectors = new Array();
var sector_count=0;
var max_sector=0;
var y_correction=50;
var x_correction=0;
var whois_reps_toselect = new Array();
var race_type;

var idNameMap = Object();

var default_cand_opacity=1

var nameList = new Array();

function write_data(json){
	
	return json
}


function jsonCallback(data){

	all_sectors = new Array();
	sector_count = 0;
	max_sector = 0;
	nameList.length = 0;
	var sectorCodeDict = {"A":"Agribusiness",
	"B":"Comm./Electronics",
	"C":"Construction",
	"D":"Defense",
	"E":"Energy/Nat. Resources",
	"F":"Finance/Insur/Estate",
	"H":"Health",
	"K":"Lawyers / Lobbyists",
	"M":"Transport",
	"N":"Misc. Business",
	"Q":"Ideology/Single Issue",
	"P":"Labor",
	"W":"Other",
	"Y":"Unknown",
	"Z":"Adminstrative Use"};

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

	var selection = canvas.selectAll("circle").data(data);
				
	selection.enter().append("circle").on("mousedown",function(){
		console.log("HIIIII");
	});

	canvas.append("svg:circle")
						.attr("cx", main_x)
						.attr("cy", main_y)
						.attr("r", main_r)
						.attr("id", "main_circle_outline")
						.style("fill","none")
						.style("stroke","grey")
						.style("stroke-width", 1)
		
		selection
			.attr("cx", main_x)
			.attr("cy", main_y)
			.attr("r", 20)
            .attr("party", function(d){ return d.Party; })
			.attr("id", function(d){if(d.CID==undefined){return "no id"}else{
				idNameMap["candidate_" + d.CID] = "";
				return ("candidate_" + d.CID)} })
			.attr("class", "candidate cand_unlocked")
			.attr("candidateName", function (d){
				idNameMap["candidate_" + d.CID] = d.Name.toLowerCase()
				nameList.push(d.Name)
				return d.Name})
			.style("fill", function(d) {
				
				var party=d.Party

			 	if (party=="D") { return "blue"}
			 	else if (party=="R") { return "red"}
			 	else {return "green"}
			})
			.attr("total_cash",function(d) {
				
				var total = 0
				for(var j in d.SectorTotals) {
					
				
					var sector = d.SectorTotals[j]
					total = total + sector
					
					var old_sector = all_sectors[j]
					if (old_sector == undefined) {
						all_sectors[j] = 0;
						sector_count++;
					}
					all_sectors[j] = all_sectors[j] + sector
				}
				return total
			})
            .on("mouseover", function(d, i){
                
               // $(this).css("stroke", "gold")
                $(this).css("fill", "gold")
                var id = $(this).attr('id');
                var el=document.getElementById(id);
                el.ownerSVGElement.appendChild(el);

            })
            .on("mouseout", function(d, i){
              // $(this).attr("class", "candidate");
               //$(this).attr("class", "candidate");
                
                var party = this.getAttribute("party");
                
              //  $(this).css("stroke", "none");
                
                if(party == "R") $(this).css("fill", "red");
                else if(party == "D") $(this).css("fill", "blue");
                else $(this).css("fill", "green");
               
            })
          
    

    
			
		var i = 0;   
		for (var j in all_sectors){
			
			
			colors_assigned[j] = colors[i]
			
			if (all_sectors[j] > max_sector) {
				max_sector = all_sectors[j]
			}
			
			i++
		}    



				
  //  		// Add the giant main ring circle
		// canvas.append("svg:circle")
		// 	.attr("cx", main_x)
		// 	.attr("cy", main_y)
		// 	.attr("r", main_r)
		// 	.attr("id", "main_circle")
			
		// canvas.append("svg:circle")
		// 	.attr("cx", main_x)
		// 	.attr("cy", main_y)
		// 	.attr("r", 2)
		// 	.attr("id", "center")
			
						
		//create sectors
		var i=0;
		var anchor_angle=0
		var x=0
		var y=0
		var bar_size=0
		var d="";
		var angle_segment=sector_count
			
		for (var j in all_sectors){
		
			bar_size = 15 + all_sectors[j]/max_sector * 100
			anchor_angle = i/angle_segment * 2 * pi;
			x = main_x + main_r * Math.cos(anchor_angle)
			y = main_y + main_r * Math.sin(anchor_angle)

			d = "M"+x+" "+y+ " l"+bar_size*Math.cos(anchor_angle)+ " "  + bar_size*Math.sin(anchor_angle) 
			
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
				.style("display", "none")
				.attr("class", "sector_circle")
				.attr("theta", anchor_angle)
				.attr("id", "sector_"+j)
				.attr("sector_name", j)
				.on("mousedown", function(){  
					
					motion_lock(this)
				})  

			var sectorName = j;
			if (sectorCodeDict[j]) {
				sectorName = sectorCodeDict[j];
			};

			canvas.append("svg:text")
				.text(sectorName)
				.attr("class","sector_bar_text")
				.attr("x",x)
				.attr("y",y)
				.attr("id", "sector_bar_text_"+j)
				.attr("sector_name", j)
				.attr("size", bar_size)
				.style("stroke", "#fffff")
				.style("-webkit-touch-callout", "none")
				.style("-webkit-user-select", "none")
				.style("-khtml-user-select", "none")
				.style("-moz-user-select", "none")
				.style("-ms-user-select", "none")
				.style("user-select", "none")
				.on("mousedown", function(){  
					
					motion_lock(this)
				})
				.attr("text-anchor", function() { 
					if (anchor_angle < Math.PI/2 || anchor_angle > 3 * Math.PI/2) {
						return "start";
					}
					else {
						return "end";
					};
				});
			   
				i++
			}


					
			var candidates=$(".candidate")
			  
			  console.log("CANDIDATE LENGTH "+candidates.length)
			for (var i=0;i<candidates.length;i++){
				
				var id=$(candidates[i]).attr("id")
				var totalCash=$(candidates[i]).attr("total_cash")
				// Make sure we don't include candidates that have no money
				// coming from any sectors.
 				//if (totalCash > 0) {
 					draw_candidates(id, canvas, colors_assigned, false)
 				//};
			   
			 }


			   
			for (var i=0;i<candidates.length;i++){       
			   //bring candidate circles above vectors
			   
				var id=$(candidates[i]).attr("id")
				var totalCash=$(candidates[i]).attr("total_cash")

				// Make sure we don't include candidates that have no money
				// coming from any sectors.
				//if (totalCash > 0) {
					var el=document.getElementById(id)
			   		el.parentNode.appendChild(el) 					
				//}; 
			}


			   
			   
			mouse_tracker(canvas, colors_assigned)
			   
			   
			   
			  
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
			   

	// Hack to make the WHO IS REP lookup work even from the pres page.
	if (whois_reps_toselect.length > 0) {
		select_cand_ids(whois_reps_toselect);
	};
	whois_reps_toselect = new Array();
    
    run_qtip();
    
  // setTimeout(function(){run_qtip()},100);

    

}

function run_qtip(){
//    
//                        $.fn.qtip.styles.tooltipDefault = {
//                        background  : '#132531',
//                        color       : '#FFFFFF',
//                        textAlign   : 'left',
//                        border      : {
//                            width   : 10,
//                            radius  : 10,
//                            color   : '#C1CFDD'
//                        },
//                        width       : 220
//                        
//                        }
//    }
    
    $('.candidate').each( function() {
        var name = this.getAttribute("candidateName");
        $(this).qtip({
                     
                    // background: <img src="plus.gif"/>
                     
                     content: name,
                     show: {delay: 0, effect: {type: 'slide', length:0}},
                     position: {
                        corner: {
                            target: 'topRight',
                            tooltip: 'bottomLeft'
                        },
                        adjust: {x: 20, y: 0}
                     }
                    
          
          
        })
    })
}

	
function initialize(filename){

	// The filename is the racetype: pres, senate, or house.
	race_type = filename;
	//nameList = new Array();
	console.log("CHECKING NAMELIST"+nameList)
	$(document).ready(function(){
	    $.ajax({
	        type: 'get',
	        url: 'http://www.stanford.edu/~raudonis/'+filename+'.json&jsonp=jsonCallback',
	        dataType: 'jsonp',
	        success: jsonCallback
	    });
     })	
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
						   
						   var candidate_sectors=candidate[0][0]["__data__"]["SectorTotals"];
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
									
									// Returns a random integer between min and max
									// http://stackoverflow.com/questions/10134237/
									function getRandomInt (min, max) {
									    return Math.floor(Math.random() * (max - min + 1)) + min;
									}

									var randomInt = getRandomInt(0,3);
									//if (randomInt == 1) {
										canvas.append("svg:path")
											.attr("d",d)
											.attr("class","vector")
											.attr("id", "cand_"+candidate_id+"_vector_"+j)
											.style("stroke",colors_assigned[j])
											.style("stroke-width",0.3+0.7*(tension_fraction)*max_stroke_width)
											.style("opacity",function() {
												return 1+0*tension_fraction;
											})
											.style("display",function() {
												if (randomInt == 1 || race_type != "house") {
													return "block"
												} else {
													return "none";
												};
											})
									//}
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
					   
					   
				   //end of code for each candidat
   // setTimeout(function(){run_qtip()},900);


	
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
                        document.captureEvents(Event.mouseover);
                        document.captureEvents(Event.click);
					}  
				
				document.onmousemove = function(event){
				   
					track_selection()
					var current_mouse_x=$("#mouse_x").html();
					var current_mouse_y=$("#mouse_y").html();
					
					mouse_x = event.pageX;
				mouse_y = event.pageY;
	
	 
					$('#mouse_x').html(mouse_x)
					$('#mouse_y').html(mouse_y)
		 
					 //var correction=0
					 var delta_xc=mouse_x-main_x-x_correction
					 var delta_yc=mouse_y-main_y-y_correction
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

						 var target_bar_text=$("#sector_bar_text_"+$('#target').html())
				   
						  target_bar_text.attr("x",new_x)
						  target_bar_text.attr("y",new_y)
						  target_bar_text.attr("text-anchor", function() { 
//                              var radians = data[i].radians
							  if (theta < Math.PI/2 || theta > 3 * Math.PI/2) {
								  return "start";
							  }
							  else {
								  return "end";
							  };
							}) 

												  
						 
						 var candidates=$(".candidate")
					
						   for (var i=0;i<candidates.length;i++){       

							var id=$(candidates[i]).attr("id")
							draw_candidates(id, canvas, colors_assigned, true)

						 }

						 
					}                                    
				};
                                
                                document.onmousedown = function(){
                                    
                                    start_selection_rect()
                                }
				
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
                                                            
                                                                
                                                                
								var mouse_x=$("#mouse_x").html()-x_correction
								var mouse_y=$("#mouse_y").html()-y_correction

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
								var x_2=$("#mouse_x").html()-x_correction
								var min_x=0
								var max_x=0

								if(x_1<x_2){min_x=x_1; max_x=x_2}
								else {min_x=x_2; max_x=x_1}

								var y_1=$("#select_point_1_y").html()  //y_1 should have been already corrected
								var y_2=$("#mouse_y").html()-y_correction
								var min_y=0
								var max_y=0
								
								if(y_1<y_2){min_y=y_1; max_y=y_2}
								else {min_y=y_2; max_y=y_1}
								
								var width=max_x-min_x
								var height=max_y-min_y
                                                                
                                                                console.log("x min "+min_x)
                                                                console.log("x max "+max_x)
                                                                console.log("y min "+min_y)
                                                                console.log("y max "+max_y)
							
								if(width<2 || height < 2){
									
									
									remove_selection()
									
								}
								else{
									

									var candidates=$(".candidate")
									var candidate="";
									var cx=0, cy=0, cand_id="", name="", d3_candidate="";
									var div_function=""
                                                                        var reveal_count=0;
								  
                                                                        $(".candidate").css("opacity",0.1)
                                                                        $(".vector").css("opacity",0.05)

									for(var i=0;i<candidates.length;i++){

										candidate=$("#"+candidates[i].id)
										d3_candidate=d3.select("#"+candidates[i].id)
										cx=candidate.attr("cx")
										cy=candidate.attr("cy")
										cand_id=candidate.attr("id")
										name=d3_candidate[0][0]["__data__"]["Name"]
                                                                                
                                                                             
										if((between(cx,min_x,max_x)) && (between(cy, min_y, max_y))){
                                                                                        
                                                                                        reveal_count++;
											candidate.css("stroke", "orange")
											//candidate.css("stroke-width", 4)
                                                                                        candidate.css("opacity", default_cand_opacity)
                                                                                        candidate.attr("in_selection", "true")
										        
											$("#selection_list").append("<div locked='false' onclick=lock_candidate(this) id=list_"+ cand_id+" for="+cand_id+" onmouseover=highlight_this(this) onmouseout=lowlight_this(this)>"+name+"</div>")
											
                                            console.log($("#selection_list"));
                                                                                        
											for (var j in all_sectors){
	        
                                                    var vector = $("#cand_" + cand_id + "_vector_" + j)
                                                    vector.css("opacity", 1)  
                                            }		

										  
										}
									}
                                                                        if(reveal_count==0){
                                                                            
                                                                            $(".candidate").css("opacity",1)
                                                                            $(".vector").css("opacity",1)
                                                                            remove_selection()
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
   
    
       $(".cand_unlocked").css("opacity", 0.1)
       $(".vector").css("opacity", 0.05)

       var target_circle=$(target).attr("for")
    
    var el=document.getElementById(target_circle);
    el.ownerSVGElement.appendChild(el);
    $("#"+target_circle).css("fill", "gold");
   
   
	var candidates=$(".cand_unlocked")
    
        
       var sectors=$("#"+target_circle)[0]["__data__"]["SectorTotals"]
       var cand_id=$("#"+target_circle).attr("id")
       for (var j in sectors){
           
           $("#cand_"+cand_id+"_vector_"+j).css("opacity", 1)
           
       }
        
        
  
        
        
        
        
	$("#"+target_circle).css("opacity", 1)
	
	
	if($(target).attr("locked")=="true") {return;}
	
	
	$(target).attr("class", "highlighted_text")
	
	
}

function lowlight_this(target){

	
	var target_circle=$(target).attr("for")
    var circle = $("#"+target_circle)
    var party=circle[0]["__data__"]["Party"]
    console.log(party)
    //var party = circle.getAttribute("party");
    if(party == "R")
        $("#"+target_circle).css("fill", "red")
    else if(party == "D")
        $("#"+target_circle).css("fill", "blue")
    else
        $("#"+target_circle).css("fill", "green")
	
	
        var candidates=$(".candidate")
        var candidate=""
        var sectors=""

        for (var j=0;j<candidates.length;j++){
            
            candidate=$("#"+candidates[j].id)
            
           
            
            if (candidate.attr("in_selection")=="true"){
              
                candidate.css("opacity", default_cand_opacity)
                
                sectors=candidate[0]["__data__"]["SectorTotals"]
                for (var m in sectors){
           
                   $("#cand_"+candidate.attr("id")+"_vector_"+m).css("opacity", 1)

               }
                
            }
            
        }
        
	//$(".cand_unlocked").css("opacity", default_cand_opacity)
	
	
   if($(target).attr("locked")=="true") {return;}
   
   $(target).attr("class", 'lowlighted_text')
	 
	

	
}

function remove_selection(){
    
         //goes back to state where no candidates were ever selected. Clearing of selection_list occurs somewhere else. 
       
	
	 $("#selection_rect").remove()
         
         $(".candidate").attr("in_selection", "false")
         
         $(".vector").css("opacity", 1)
	
	 $(".cand_locked").attr("class", "candidate cand_unlocked")
	 
	 $(".candidate")
			.css("stroke", "black")
			.css("stroke-width", 1.5)
			.css("opacity", default_cand_opacity)

	var candidates=$(".candidate")
	var party="", id="", color="";
	

	
}

function search_data(name) {
	name = name.toLowerCase()

								   
	var candidates=$(".candidate")
					
	var candidates=$(".candidate")
	var candidate="";
	var cx=0, cy=0, cand_id="";

	var cidArray = new Array();

	for(var i=0;i<candidates.length;i++){
		candidate=$("#"+candidates[i].id)	
		var cand_id=candidate.attr("id")
		var cand_name = idNameMap[cand_id].toLowerCase()
		if (cand_name.indexOf(name) != -1) {
			
			var index = cand_id.indexOf("_")
			var passID = cand_id.substring(index+1)
			cidArray.push(passID)
		}
	}
	select_cand_ids(cidArray);

}

function select_cand_ids(cids) {
	// Grey out all candidates and vectors
    $(".candidate").css("opacity", 0.1)
    $(".vector").css("opacity", 0.05)

 	for (var i = 0; i < cids.length; i++) {
 		var cand_id = cids[i];
 		$("#candidate_" + cand_id).css("opacity", 1)
 		$("#candidate_" + cand_id).css("stroke", "white")//ff9912
 		
		if ($("#candidate_" + cand_id).attr("id")) {
			var el=document.getElementById($("#candidate_" + cand_id).attr("id"))
			el.parentNode.appendChild(el)
		};

        // if(cids.length == 1){
        //     $("#candidate_" + cand_id).css("stroke", "#ff9912");
        //     $("#candidate_" + cand_id).css("stroke-width", 5);
        // }    
        // else
        // {
        //     $("#candidate_" + cand_id).css("stroke", "black");
        //     $("#candidate_" + cand_id).css("stroke-width", 3);
        // }
        
	    for (var j in all_sectors){
	        
	        var vector = $("#cand_candidate_" + cand_id + "_vector_" + j)
	        vector.css("display","block")
	        vector.css("opacity", 1)  
	    }
 	};
}

/*
var candidates=$(".candidate")
			  
			  
			for (var i=0;i<candidates.length;i++){
				
				var id=$(candidates[i]).attr("id")
				var totalCash=$(candidates[i]).attr("total_cash")
				// Make sure we don't include candidates that have no money
				// coming from any sectors.
 				//if (totalCash > 0) {
 					draw_candidates(id, canvas, colors_assigned, false)
 				//};
			   
			 }


			   
			for (var i=0;i<candidates.length;i++){       
			   //bring candidate circles above vectors
			   
				var id=$(candidates[i]).attr("id")
				var totalCash=$(candidates[i]).attr("total_cash")
				// Make sure we don't include candidates that have no money
				// coming from any sectors.
				//if (totalCash > 0) {
					var el=document.getElementById(id)
			   		el.parentNode.appendChild(el) 					
				//}; 
			}
*/

function select_all_cand()
{
	$(".candidate").css("opacity", 1)      
	//$(".vector").css("display","block")
	$(".vector").css("opacity", 1)  
	$(".candidate").css("stroke", "black")
}

function getNames() {
	return nameList
}


function start_selection_rect(){
    
        var mouse_x=$("#mouse_x").html()-x_correction
        var mouse_y=$("#mouse_y").html()-y_correction
        
        var delta_x=mouse_x-main_x
        var delta_y=mouse_y-main_y
        var length_squared=Math.pow(delta_x, 2)+Math.pow(delta_y, 2)
        
        if(length_squared > Math.pow(main_r, 2)){return ""}
        
   
        var canvas = d3.select("#canvas")
        
        remove_selection()
								
							
        $("#select_status").html("true")



        
        var width=1
        var height=1

        var d="M"+mouse_x+" "+mouse_y+" l"+width+" 0 l0 "+height+" h-"+width+" 0 v0 -"+height


        canvas.append("svg:path")
                        .attr("id","selection_rect")
                        .attr("d",d)
                $("#select_point_1_x").html(mouse_x)
                $("#select_point_1_y").html(mouse_y)
    
}


