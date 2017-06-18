/*
SA.js
Quentin Truong
Naming convention: underscores for varaibles. m_ for data members. camelCase for functions. 
*/

class Controller{
	constructor(){
		var m_num_rooms;
		var m_num_max_students;
		var m_vec_instructors = [];
		var m_vec_students = [];
		var m_space_sessions = [];
		this.init();
	}

	init(){
		//=======Declare vars, gather input, and format input=======
		var num_rooms = 2;//temp hardcode
		var num_max_students = 2;//temp hardcode
		var num_instructors = 2;//temp hardcode
		var vec_instructors = [];
		var num_students = 6;//6;//temp hardcode
		var vec_students = [];
		var space_sessions = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];

		for (var a = 0; a < num_instructors; a++){
			var wage = 0;
			var time_availability = "";
			switch(a){//temp hardcode
				case 0:
					wage = 10;
					time_availability = "0-3,";
				break;
				case 1:
					wage = 20;
					time_availability = "0-3";
				break;
				case 2:
					wage = 30;
					time_availability = "0-3";
				break;
			}
			vec_instructors[a] = new Instructor(a, wage, convertTime(time_availability));
		}
		for (var a = 0; a < num_students; a++){
			var rate = 0;
			var time_availability = "";
			switch(a){//temp hardcode
				case 0:
					rate = 1;
					time_availability = "0-5,";
				break;
				case 1:
					rate = 2;
					time_availability = "0-5,";
				break;
				case 2:
					rate = 3;
					time_availability = "0-5";
				break;
				case 3:
					rate = 1;
					time_availability = "0-5,";
				break;
				case 4:
					rate = 2;
					time_availability = "0-5";
				break;
				case 5:
					rate = 3;
					time_availability = "0-5";
				break;
			}
			vec_students[a] = new Student(a, rate, convertTime(time_availability));
		}
		//for (var a = 0; a < 3; a++){console.log(vec_instructors[a]);}for (var a = 0; a < 3; a++){console.log(vec_students[a]);}
		for (var a = 0; a < num_instructors; a++){
			for (var b = 0; b < vec_instructors[a].m_times_available.length; b++){
				var time = vec_instructors[a].m_times_available[b];
				space_sessions[time].push(new Session(time, a, space_sessions[time].length));
			}
		}
		//for (var a = 0; a < 24; a++){console.log(space_sessions[a]);}

		//======Store data======
		this.m_num_rooms = num_rooms;
		this.m_num_max_students = num_max_students;
		this.m_vec_instructors = vec_instructors;
		this.m_vec_students = vec_students;
		this.m_space_sessions = space_sessions;
	}

	simulatedAnnealing(max_iterations, max_temp, temp_change_type){
		var util = require('util');

		var curr_solution = deepCopy(this.m_space_sessions);
		var curr_students = deepCopy(this.m_vec_students);

		for (var a = 0; a < 100; a++){
			this.permuteStudent(curr_solution);
		}
		var curr_cost = this.cost(curr_solution);




/*

		var best_solution = deepCopy(this.m_space_sessions);
		var best_students = deepCopy(this.m_vec_students);
		var best_cost = 100000;//figure out later, or eh.
		
		//console.log(util.inspect(curr_solution,{ depth: null }));
		//console.log(util.inspect(this.m_vec_students,{ depth: null }));



		var num_iteration = 1;
		while (true){
			console.log("iteration: " + num_iteration);
			var curr_temp = this.calculateTemp(num_iteration, max_temp, temp_change_type);
			if (curr_temp == 0)
				break;

			var i_solution = deepCopy(curr_solution);
			this.m_vec_students = deepCopy(curr_students);
			this.permuteStudent(i_solution);
			var i_students = this.m_vec_students;
			var i_cost = this.cost(i_solution);

			if (i_cost <= curr_cost){
				curr_solution = deepCopy(i_solution);
				curr_students = deepCopy(i_students);
				curr_cost = i_cost;
				if (i_cost <= best_cost){
					best_solution = deepCopy(i_solution);
					best_students = deepCopy(i_students);
					best_cost = i_cost;
				}
			}

			num_iteration++;
		}
		console.log(best_cost);*/
	}

	permuteStudent(curr_solution){
		console.log("permuteStudent");
		if (this.m_vec_students.length > 0){

			var rand_pos_student = Math.floor(Math.random() * this.m_vec_students.length);
			console.log("rand_pos_student: " + rand_pos_student);

			if (this.m_vec_students[rand_pos_student].m_times_available.length > 0){
				var rand_pos_time = Math.floor(Math.random() * this.m_vec_students[rand_pos_student].m_times_available.length);
				var rand_time = this.m_vec_students[rand_pos_student].m_times_available[rand_pos_time];
				console.log("rand_time: " + rand_time);
				if (curr_solution[rand_time].length > 0){
					var rand_pos_session = Math.floor(Math.random() * curr_solution[rand_time].length);
					console.log("rand_pos_session: " + rand_pos_session);

					if (this.m_vec_students[rand_pos_student].m_curr_time == -1 && //maybe eventually remove extras, if i want to
						this.m_vec_students[rand_pos_student].m_curr_sess == -1 &&
						this.m_vec_students[rand_pos_student].m_sess_pos == -1){
						console.log("Student is not in solution space yet.");
					}
					else{
						console.log("Student is already in solution space.");
						this.kickStudent(curr_solution[this.m_vec_students[rand_pos_student].m_curr_time][this.m_vec_students[rand_pos_student].m_curr_sess].m_vec_students_ID, this.m_vec_students[rand_pos_student].m_sess_pos);
					}

					if (curr_solution[rand_time][rand_pos_session].m_vec_students_ID.length < this.m_num_max_students){
						console.log("Session not full.");
					}
					else{
						console.log("Session full.");
						var rand_pos_kick = Math.floor(Math.random() * curr_solution[rand_time][rand_pos_session].m_vec_students_ID.length);
						this.kickStudent(curr_solution[rand_time][rand_pos_session].m_vec_students_ID, rand_pos_kick);
					}

					curr_solution[rand_time][rand_pos_session].m_vec_students_ID.push(rand_pos_student);
					this.m_vec_students[rand_pos_student].m_curr_time = rand_time;
					this.m_vec_students[rand_pos_student].m_curr_sess = rand_pos_session;
					this.m_vec_students[rand_pos_student].m_sess_pos = curr_solution[rand_time][rand_pos_session].m_vec_students_ID.length-1;

					var vec_active_sess = [];
					for (var d = 0; d < curr_solution[rand_time].length; d++){
						if (curr_solution[rand_time][d].m_vec_students_ID.length > 0){
							vec_active_sess.push(curr_solution[rand_time][d].m_sess_pos);
						}
					}
					console.log("vec_active_sess: ");
					console.log(vec_active_sess);
					if (vec_active_sess.length > this.m_num_rooms){
						console.log("Too few rooms for the number of sessions at this time.");
						vec_active_sess.splice(vec_active_sess.indexOf(rand_pos_session), 1);
						var rand_pos_active_sess = Math.floor(Math.random() * vec_active_sess.length);
						var rand_active_sess = vec_active_sess[rand_pos_active_sess];
						console.log("Kicking everyone in session: " + rand_active_sess);
						console.log(curr_solution[rand_time][rand_active_sess].m_vec_students_ID.length);
						while (curr_solution[rand_time][rand_active_sess].m_vec_students_ID.length > 0){
							this.kickStudent(curr_solution[rand_time][rand_active_sess].m_vec_students_ID, 0);
						}
					}
					else{
						console.log("Sufficient rooms.");
					}
				}
				else{
					console.log("Removing this time because it has no legal session.")
					//this.m_vec_students[rand_pos_student].m_times_available.splice(rand_pos_time, 1);
					this.permuteStudent(curr_solution);
				}
			}
			else{
				console.log("Removing this student because it has no legal available times.")
				//this.m_vec_students.splice(rand_pos_student, 1);
				this.permuteStudent(curr_solution);
			}
		}
		else{
			console.log("There are no students that can be used to permute legally.");
		}
		console.log("");
	}

	calculateTemp(i, max_temp, temp_change_type){
		switch(temp_change_type){
			case 0:
				return max_temp - i;
		}
	}
	
	cost(curr_solution){
		var cost = 0;
		for (var pos_time = 0; pos_time < curr_solution.length; pos_time++){
			for (var pos_sess = 0; pos_sess < curr_solution[pos_time].length; pos_sess++){
				for (var pos_student = 0; pos_student < curr_solution[pos_time][pos_sess].m_vec_students_ID.length; pos_student++){
					if (pos_student == 0){
						var instructor_ID = curr_solution[pos_time][pos_sess].m_instructor_ID;
						//console.log("instructor_ID: " + instructor_ID);
						//console.log("wage: " + this.m_vec_instructors[instructor_ID].m_wage)
						cost += this.m_vec_instructors[instructor_ID].m_wage;
					}
					var student_ID = curr_solution[pos_time][pos_sess].m_vec_students_ID[pos_student];
					//console.log("students_ID: " + student_ID);
					//console.log("payment: " + this.m_vec_students[student_ID].m_payment);
					cost -= this.m_vec_students[student_ID].m_payment;

				}
			}
		}
		console.log(cost);
	}

	kickStudent(vec_students_ID, pos_kick){
		var rand_student_kick = vec_students_ID[pos_kick];
		console.log("Kicking studentID: " + rand_student_kick);
		vec_students_ID.splice(pos_kick, 1);
		this.m_vec_students[rand_student_kick].m_curr_time = -1;
		this.m_vec_students[rand_student_kick].m_curr_sess = -1;
		this.m_vec_students[rand_student_kick].m_sess_pos = -1;
		for (var a = pos_kick; a < vec_students_ID.length; a++){
			this.m_vec_students[vec_students_ID[a]].m_sess_pos--;
		}
	}
}

class Session{
	constructor(time, instructorID, sess_pos){
		this.m_time = time;
		this.m_instructor_ID = instructorID;
		this.m_vec_students_ID = [];
		this.m_sess_pos = sess_pos;
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
		this.m_curr_time = -1;
		this.m_curr_sess = -1;
		this.m_sess_pos = -1;
	}
}

function convertTime(time_availability){//ezier way is deal thru vector of ints where each int is an available time, exclude unavailable times entirely
	var vec_availability = [];

	time_availability = time_availability.replace(/ /g, "");

	if (time_availability.length-1 >= 0 && time_availability.charAt(time_availability.length-1) != ",")
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






//======Run======

var obj = new Controller();
obj.simulatedAnnealing(10, 100, 0);

