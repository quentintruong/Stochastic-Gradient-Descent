/*
SA.js
Quentin Truong
Naming convention: underscores for varaibles. m_ for data members. camelCase for functions. 
*/

class Controller{
	constructor(){
		var m_vec_instructors = [];
		var m_vec_students = [];
		var m_vec_sessions = [];
		var m_num_rooms;
		var m_num_max;
		var m_vec_times = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		this.init();
	}

	init(){
		var num_instructors = 3;
		var vec_instructors = [];
		var num_students = 3;
		var vec_students = [];
		var num_sessions = 0;
		var vec_sessions = [];
		var num_rooms = 2;
		var num_max = 5;
		for (var a = 0; a < num_instructors; a++){
			var wage = 0;
			var time_availability = "";
			switch(a){
				case 0:
					wage = 10;
					time_availability = "0-5,";
				break;
				case 1:
					wage = 20;
					time_availability = "0, 1";
				break;
				case 2:
					wage = 30;
					time_availability = "0 - 2, 4-5";
				break;
			}
			vec_instructors[a] = new Instructor(a, wage, convertTime(time_availability));
		}
		for (var a = 0; a < num_students; a++){
			var rate = 0;
			var time_availability = "";
			switch(a){
				case 0:
					rate = 1;
					time_availability = "0-4,";
				break;
				case 1:
					rate = 2;
					time_availability = "0, 4";
				break;
				case 2:
					rate = 3;
					time_availability = "0 - 2, 4-5";
				break;
			}
			vec_students[a] = new Student(a, rate, convertTime(time_availability));
		}
		for (var a = 0; a < 3; a++){console.log(vec_instructors[a]);}for (var a = 0; a < 3; a++){console.log(vec_students[a]);}
		for (var a = 0; a < num_instructors; a++){
			for (var b = 0; b < vec_instructors[a].m_times_available.length; b++){
				vec_sessions[num_sessions] = new Session(vec_instructors[a].m_times_available[b], vec_instructors[a].m_instructor_ID);
				num_sessions++;
			}
		}
		for (var a = 0; a < num_sessions; a++){console.log(vec_sessions[a]);}
		this.m_vec_instructors = vec_instructors;
		this.m_vec_students = vec_students;
		this.m_vec_sessions = vec_sessions;
		this.m_num_rooms = num_rooms;
		this.m_num_max = num_max;
	}

	simulatedAnnealing(){
		var current_solution = deepCopy(this.m_vec_sessions);
		var neighbor_solution = deepCopy(this.m_vec_sessions);


	}

	permuteStudent(){

	}
}

class Session{
	constructor(time, instructorID){
		this.m_time = time;
		this.m_instructorID = instructorID;
		this.m_vec_studentsID = [];
	}
}

class Instructor{
	constructor(ID, wage, times_available){
		this.m_instructor_ID = ID;
		this.m_wage = wage;
		this.m_times_available = times_available;
	} 
}

class Student{
	constructor(ID, payment, times_available){
		this.m_student_ID = ID;
		this.m_payment = payment;
		this.m_times_available = times_available;
	}
}

function convertTime(time_availability){//ezier way is deal thru vector of ints where each int is an available time, exclude unavailable times entirely
	var vec_availability = [];

	time_availability = time_availability.replace(/ /g, "");

	if (time_availability.charAt(time_availability.length-1) != ",")
		time_availability += ",";
	while (time_availability.indexOf(",") != -1){
		if (time_availability.charAt(1) == '-'){
			for (var b = time_availability.charAt(0); b < time_availability.charAt(2); b++){
				vec_availability[vec_availability.length] = parseInt(b);
			}
			time_availability = time_availability.substr(4);
		}
		else{
			vec_availability[vec_availability.length] = parseInt(time_availability.charAt(0));
			time_availability = time_availability.substr(2);
		}
	}
	return vec_availability;
}

//deep copy from http://stackoverflow.com/questions/7486085/copying-array-by-value-in-javascript - tfmontague
function deepCopy(o){
   var output, v, key;
   output = Array.isArray(o) ? [] : {};
   for (key in o) {
       v = o[key];
       output[key] = (typeof v === "object") ? deepCopy(v) : v;
   }
   return output;
}

var obj = new Controller();
obj.simulatedAnnealing();

