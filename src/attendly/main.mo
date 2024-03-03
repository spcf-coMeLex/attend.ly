import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Option "mo:base/Option";
import Error "mo:base/Error";
import Iter "mo:base/Iter";
import Map "mo:base/Map";
import { phash } "mo:map/Map";
import { thash } "mo:map/Map";
import Types "types";

actor Attendly {

    type Result<Ok, Err> = Types.Result<Ok, Err>;
    type HashMap<K, V> = Types.HashMap<K, V>;
    // type Student = Types.Student;
    // type Employee = Types.Employee;
    type Attendance = Types.Attendance;

    stable let students = Map.new<Text, Principal>();
    stable let employees = Map.new<Text, Principal>();
    stable let attendances = Map.new<Text, Attendance>();

    public shared ({caller}) func studentRegister(uId: Text): async Result<Text, Text> {

        if (Principal.isAnonymous(caller)) {
            return #err("Registration error: Anonymous identity found!");
        } else 
        if (Map.get<Text, Principal>(students, thash, uId) == ?caller) {
            return #err("Registration error: Student already registered!");
        } else {        
            switch(Map.add<Text, Principal>(students, thash, uId, caller)) {
                case(null){
                    return #ok("Student Account Created Successfully!");
                };
                case(?student){
                    return #err("Something went wrong!");
                }
            };  
        }
    };

    public shared ({caller}) func employeesRegister(uId: Text): async Result<Text, Text> {
        if (Principal.isAnonymous(caller)) {
            return #err("Registration error: Anonymous identity found!");
        } else if (Map.get<Text, Principal>(employees, thash, uId) == ?caller) {
            return #err("Registration error: Employee already registered!");
        } else {        
            switch(Map.add<Text, Principal>(employees, thash, uId, caller)) {
                case(null){
                    return #ok("Employee Account Created Successfully!");
                };
                case(?employee){
                    return #err("");
                }
            };  
        }
    };

    public shared query func showEmployee(uId : Text) : async Result<Principal, Text> {
        switch (Map.get<Text, Principal>(employees, thash, uId)) {
            case (null) {
                return #err("Employee does not exist");
            };
            case (?employee) {
                return #ok(employee);
            };
        };
    };

    public shared query func showStudent(uId : Text) : async Result<Principal, Text> {
        switch (Map.get<Text, Principal>(students, thash, uId)) {
            case (null) {
                return #err("Student does not exist");
            };
            case (?student) {
                return #ok(student);
            };
        };
    };

    public shared func createAttendance(uId : Text, attendanceInfo : Attendance) : async Result<Text, Text> {
        if (Map.has<Text, Attendance>(attendances, thash, uId)){
            return #err("Attendance Error: provided uId already existed!");
        } else{
            switch(Map.add<Text, Attendance>(attendances, thash, uId, attendanceInfo)){
                case(null){
                    return #ok("Employee Account Created Successfully!");
                };
                case(?attendance){
                    return #err("Something went wrong!");
                }
            };
            
        }
    };

    public shared query func showAttendance(uId : Text) : async Result<Attendance, Text> {
        switch (Map.get<Text, Attendance>(attendances, thash, uId)) {
            case (null) {
                return #err("Member does not exist");
            };
            case (?attendance) {
                return #ok(attendance);
            };
        };
    };

    public shared query func getStudents(): async [Principal] {
        Iter.toArray(Map.vals<Text, Principal>(students));
    };

    public shared query func getAttendances(): async [Attendance] {
        Iter.toArray(Map.vals<Text, Attendance>(attendances));
    };

    public shared query func getEmployees(): async [Principal] {
        Iter.toArray(Map.vals<Text, Principal>(employees));
    };

     public shared(msg) func whoami(): async Principal {
        return msg.caller;
    }
}
