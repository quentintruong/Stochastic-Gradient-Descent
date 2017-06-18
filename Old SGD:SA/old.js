/*
4 Dimensions w/ 5th dimension cost; Room * Time * Instructor * vector of Student
Session(room, time, instructor, vector of students)

Hard Constraints:
	0 <= num_sessions <= num_facilities == num_instructors
	0 <= session.num_students <= session.max_num_seats
	session.time (is element of) session.instructor.available_times
	session.time (is element of) session.facility.available_times
	session.time (is element of) for each session.student.available_times
	facility is in use by no more than one thing per time
	instructor is at no more than one thing per time
	student is at no more than one thing per time

Soft Constraints:
	Maximize:
	Sum(student.payment) - Sum(instructor.wage)//facility regarded as not an affectable day-to-day cost

Cost Function:
	f(vector of sessions)

Notes on Implementation:
	Only initialize Time dimension for relevant hours (Ex: 2pm-12pm)
	Permute students according to a student_time_available
	There is only one vector of Students for all sessions, vector holds info on which session. This way, worry about removing a student from another session. Position will tell you which student it is.
*/

class Controller{
	constructor(){
		this.sessions = [];
	}
}

class Session{//is the room, time, instructor, and all its students
	constructor(facility, instructor, students){
		
	}
}

class Facility{//basically is a room with a number of seats and a time
	constructor(num_seats, time){
		this.times = time;//int; the time that the facility would be in use at
		this.num_seats = num_seats;//array of 24 elements
	}
}

class Instructor{
	constructor(normal_wage){
		this.normal_wage = normal_wage;//int
		this.times_available = times_available;//array of 24 elements
	} 
}

class Student{
	constructor(payment){
		this.payment = payment;//int
		this.times_available = times_available;//array of 24 elements
	}
}

function simulatedAnnealing(){

}