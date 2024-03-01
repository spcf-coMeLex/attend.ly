import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Error "mo:base/Error";
import Iter "mo:base/Iter";
import Map "mo:base/Map";
import { phash } "mo:map/Map";
import Types "types";

actor Attendly {

    type Result<Ok, Err> = Types.Result<Ok, Err>;
    type HashMap<K, V> = Types.HashMap<K, V>;
    type Student = Types.Student;
    type Employee = Types.Employee;



    stable let students = Map.new<Principal, Student>();
    stable let employee = Map.new<Principal, Employee>();

    public shared ({caller}) func register(studentInfo: Student): async Result<(), Text> {
        switch(Principal.isAnonymous(caller)) {
            case(true) { 
                return #err("Registration failed. Anonymous identity detected.");
             };
            case(false) {
                return #ok();
                };
            };
    };

    public shared query func getStudents(): async [Student] {
        Iter.toArray(Map.vals<Principal, Student>(students));
    }
}
