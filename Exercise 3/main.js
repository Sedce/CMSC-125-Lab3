//tables used
var job_list = [];
var memory_list = [];
var job_queue = [];
var memory_table = document.getElementById('memory_table');
var job_table = document.getElementById('job_queue');
var job = function(name, time, job_size){
  return {name:name, time:time,job_size:job_size, job_status:"waiting"}
}
var memory_block =  function(name,memory,jobs) {
  return{ name: name, available_memory: memory, jobs: jobs};
}

window.onload = function (){
initializeMemory();
}
function initializeMemory(){
    job_list[0] = new job(1,5,5760);
    job_list[1] = new job(2,4,4190);
    job_list[2] = new job(3,8,3290);
    job_list[3] = new job(4,2,2030);
    job_list[4] = new job(5,2,2550);
    job_list[5] = new job(6,6,6990);
    job_list[6] = new job(7,8,8940);
    job_list[7] = new job(8,10,740);
    job_list[8] = new job(9,7,3930);
    job_list[9] = new job(10,6,6890);
    job_list[10] = new job(11,5,6580);
    job_list[11] = new job(12,8,3820);
    job_list[12] = new job(13,9,9140);
    job_list[13] = new job(14,10,420);
    job_list[14] = new job(15,10,220);
    job_list[15] = new job(16,7,7540);
    job_list[16] = new job(17,3,3210);
    job_list[17] = new job(18,1,1380);
    job_list[18] = new job(19,9,9850);
    job_list[19] = new job(20,3,3610);
    job_list[20] = new job(21,7,7540);
    job_list[21] = new job(22,2,2710);
    job_list[22] = new job(23,8,8390);
    job_list[23] = new job(24,5,5950);
    job_list[24] = new job(25,10,760);
    for (var i = 0; i < job_list.length; i++) {
          row = job_table.insertRow(i+1)
          cell1 = row.insertCell(0);
          cell2 = row.insertCell(1);
          cell3 = row.insertCell(2);
          cell4 = row.insertCell(3);
          cell1.innerHTML = " " + (i+1);
          cell2.innerHTML = " " + job_list[i].time;
          cell3.innerHTML = " " + job_list[i].job_size;
          cell4.innerHTML = job_list[i].job_status;

    }
    memory_list[0] = new memory_block(1,9500,[]);
    memory_list[1] = new memory_block(2,7000,[]);
    memory_list[2] = new memory_block(3,4500,[]);
    memory_list[3] = new memory_block(4,8500,[]);
    memory_list[4] = new memory_block(5,3000,[]);
    memory_list[5] = new memory_block(6,9000,[]);
    memory_list[6] = new memory_block(7,1000,[]);
    memory_list[7] = new memory_block(8,5500,[]);
    memory_list[8] = new memory_block(9,1500,[]);
    memory_list[9] = new memory_block(10,500,[]);
    for (var i = 0; i < memory_list.length; i++) {
          row = memory_table.insertRow(i+1)
          cell1 = row.insertCell(0);
          cell2 = row.insertCell(1);
          cell3 = row.insertCell(2);
          cell1.innerHTML = " " + (i+1);
          cell2.innerHTML = " " + memory_list[i].available_memory;
          cell3.innerHTML = " ";
    }
}
function bestfitStart(){
  copy_of_memory = [];
  for (var i = 0; i < memory_list.length; i++) {
          copy_of_memory[i] = new memory_block(parseInt(memory_list[i].name),parseInt(memory_list[i].available_memory),memory_list[i].jobs);
        //  console.log("Name ::" + copy_of_memory[i].name);
  }
  console.log("Length ::" + copy_of_memory.length);
  function myComp(a,b){
      return parseInt(a.available_memory,10) - parseInt(b.available_memory, 10);
    }
  copy_of_memory.sort(myComp);

  for(var i = 0; i < job_list.length; i++) {
        for(j = 0; j < copy_of_memory.length; j++){
            if((copy_of_memory[j].available_memory >= job_list[i].job_size) && (job_list[i].job_status == "waiting")){
                  copy_of_memory[j].available_memory = parseInt(copy_of_memory[j].available_memory) -  parseInt(job_list[i].job_size);
                  job_list[i].job_status = "processing";
                  copy_of_memory[j].jobs.push(job_list[i]);
        }
      }
  }
function myComparator(a,b){
    return parseInt(a.time,10) - parseInt(b.time, 10);
  }
for(var i = 0; i < memory_list.length; i++){
        copy_of_memory[i].jobs.sort(myComparator);
}

for (var i = 0; i < copy_of_memory.length; i++) {
     console.log("Memory ::" + copy_of_memory[i].name);
      memory_list[parseInt(copy_of_memory[i].name) - 1] = copy_of_memory[i];
}
console.log("Length cop:: " + memory_list.length);
reDraw();
}
function bestfit(){
  //  initializeMemory();
    setInterval(function mainloop(){
          if(hasWaiting()){
                console.log("Length mem ::" + memory_list.length);
              bestfitStart();
            for (var i = 0; i < memory_list.length; i++) {
                    for (var j = 0; j < memory_list[i].jobs.length; j++) {
                              if(memory_list[i].jobs[j].time > 0){
                                  memory_list[i].jobs[j].time -= 1;
                              }else{
                                  memory_list[i].available_memory += parseInt(memory_list[i].jobs[j].job_size);
                                  memory_list[i].jobs[j].job_status = "finished";
                                  memory_list[i].jobs.shift();

                              }
                    }
            }
            reDraw();
              console.log("Length mem 3::" + memory_list.length);
    }
  }, 1000);
}
function firstFitStart(){

  for(var i = 0; i < job_list.length; i++) {
        for(j = 0; j < memory_list.length; j++){
            if((memory_list[j].available_memory >= job_list[i].job_size) && (job_list[i].job_status == "waiting")){
                  memory_list[j].available_memory = parseInt(memory_list[j].available_memory) -  parseInt(job_list[i].job_size);
                  job_list[i].job_status = "processing";
                  //console.log("Job" + job_list[i].name + " Status ::" + job_list[i].job_status);
                  memory_list[j].jobs.push(job_list[i]);
        }
      }
}
function myComparator(a,b){
    return parseInt(a.time,10) - parseInt(b.time, 10);
  }

for(var i = 0; i < memory_list.length; i++){
        memory_list[i].jobs.sort(myComparator);
}
reDraw();
}
function firstfit(){
//initializeMemory();
setInterval(function mainloop(){
      if(hasWaiting()){
          firstFitStart();
        for (var i = 0; i < memory_list.length; i++) {
                for (var j = 0; j < memory_list[i].jobs.length; j++) {
                          if(memory_list[i].jobs[j].time > 0){
                            memory_list[i].jobs[j].time -= 1;
                          }else{
                              memory_list[i].available_memory += parseInt(memory_list[i].jobs[j].job_size);
                              memory_list[i].jobs[j].job_status = "finished";
                              memory_list[i].jobs.shift();
                          }
                }
        }
        reDraw();
}
}, 2000);
}
function hasWaiting(){
  for (var i = 0; i < job_list.length; i++) {
          if(job_list[i].job_status == "waiting")
              return true;
  }
  return false;
}
function worstfitstart(){
  copy_of_memory = [];
  for (var i = 0; i < memory_list.length; i++) {
          copy_of_memory[i] = new memory_block(parseInt(memory_list[i].name),parseInt(memory_list[i].available_memory),memory_list[i].jobs);
        //  console.log("Name ::" + copy_of_memory[i].name);
  }
  console.log("Length ::" + copy_of_memory.length);
  function myComp(a,b){
      return parseInt(b.available_memory,10) - parseInt(a.available_memory, 10);
    }
  copy_of_memory.sort(myComp);

  for(var i = 0; i < job_list.length; i++) {
        for(j = 0; j < copy_of_memory.length; j++){
            if((copy_of_memory[j].available_memory >= job_list[i].job_size) && (job_list[i].job_status == "waiting")){
                  copy_of_memory[j].available_memory = parseInt(copy_of_memory[j].available_memory) -  parseInt(job_list[i].job_size);
                  job_list[i].job_status = "processing";
                  copy_of_memory[j].jobs.push(job_list[i]);
        }
      }
  }
function myComparator(a,b){
    return parseInt(a.time,10) - parseInt(b.time, 10);
  }
for(var i = 0; i < memory_list.length; i++){
        copy_of_memory[i].jobs.sort(myComparator);
}

for (var i = 0; i < copy_of_memory.length; i++) {
     console.log("Memory ::" + copy_of_memory[i].name);
      memory_list[parseInt(copy_of_memory[i].name) - 1] = copy_of_memory[i];
}
console.log("Length cop:: " + memory_list.length);
reDraw();
}
function worstfit(){
  setInterval(function mainloop(){
        if(hasWaiting()){
              console.log("Length mem ::" + memory_list.length);
            worstfitstart();
          for (var i = 0; i < memory_list.length; i++) {
                  for (var j = 0; j < memory_list[i].jobs.length; j++) {
                            if(memory_list[i].jobs[j].time > 0){
                                memory_list[i].jobs[j].time -= 1;
                            }else{
                                memory_list[i].available_memory += parseInt(memory_list[i].jobs[j].job_size);
                                memory_list[i].jobs[j].job_status = "finished";
                                memory_list[i].jobs.shift();

                            }
                  }
          }
          reDraw();
            console.log("Length mem 3::" + memory_list.length);
  }
}, 2000);
}
  // function mainloop(){
  //     for (var i = 0; i < array.length; i++) {
  //       array[i]
  //     }
  // }
  function reDraw(){
  //  console.log("Length mem redraw::" + memory_list.length);
    for (var i = 0; i < job_list.length; i++) {
          row = job_table.rows[i + 1].cells;
          row[3].innerHTML = " " + job_list[i].job_status;
    }
    for (var i = 0; i < memory_list.length; i++) {
          row = memory_table.rows[i + 1].cells;
          row[1].innerHTML = " " + memory_list[i].available_memory;
          row[2].innerHTML = " " + updateJobList(i);
    }
  }
  function updateJobList(i){
    st = '';
      for(j = 0; j < memory_list[i].jobs.length;j++){
              st = st + "Job: "+ memory_list[i].jobs[j].name + " time" + "(" + memory_list[i].jobs[j].time + ")" + " size : " + memory_list[i].jobs[j].job_size;
      }

      return st;
  }
