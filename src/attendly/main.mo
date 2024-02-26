import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Error "mo:base/Error";
import Iter "mo:base/Iter";

actor Attendly {
    type Student = {
        name: Text;
        section: Text;
        course: Text;
    };

    let students = HashMap.HashMap<Principal, Student>(1, Principal.equal, Principal.hash);

    public shared ({caller}) func register(studentInfo: Student): async () {
        if (Principal.isAnonymous(caller)) {
            // throw Error.reject("Can't register anonymous user");
            return;
        };
        students.put(caller, studentInfo);
    };

    public shared query func getStudents(): async [Student] {
        Iter.toArray(students.vals());
    }
}
