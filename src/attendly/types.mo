import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
module {

    public type Result<Ok, Err> = Result.Result<Ok, Err>;
    public type HashMap<Ok, Err> = HashMap.HashMap<Ok, Err>;

    // public type Student = {
    //     uId: Text;
    // };

    // public type Employee = {
    //     uId: Text;
    // };

    public type StatusType = {
        #In;
        #Out;
    };

    public type Day = {
        #Monday;
        #Tuesday;
        #Wednesday;
        #Thursday;
        #Friday;
        #Saturday;
        #Sunday;
    };

    public type Attendance = {
        studentId: Principal;
        studentSectionId: Text;
        sectionSubjectId: Text;
        day: Day;
        time: Text;
        attendanceType: StatusType;
    };


};