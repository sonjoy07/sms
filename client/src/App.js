import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer } from 'react-toastify';

import TeacherDashboard from "./Structure/Dashboard/TeacherDashboard/TeacherDashboard";
import StudentDashboard from "./Structure/Dashboard/StudentDashboard/StudentDashboard";
import Attendance from "./Structure/Dashboard/TeacherDashboard/TeacherDasboardFeatures/Attendance/Attendance";
import TeacherNotice from "./Structure/Dashboard/TeacherDashboard/TeacherDasboardFeatures/Notice/TeacherNotice";
import SchoolDashboard from "./Structure/Dashboard/SchoolDashboard/SchoolDashboard";
import SuperAdminDashboard from "./Structure/Dashboard/SuperAdminDashboard/SuperAdminDashboard";
import StudentAttendanceView from "./Structure/Dashboard/StudentDashboard/StudentDashboardFeatures/StudentAttendanceView";
import AddNewSchool from "./Structure/Dashboard/SuperAdminDashboard/SuperAdminDashboardFeatures/AddNewSchool/AddNewSchool";
import CreateNewOrganization from "./Structure/Dashboard/SuperAdminDashboard/SuperAdminDashboardFeatures/CreateNewOrganization/CreateNewOrganization";
import CreateNewClass from "./Structure/Dashboard/SuperAdminDashboard/SuperAdminDashboardFeatures/CreateNewClass/CreateNewClass";
import CreateNewSection from "./Structure/Dashboard/SuperAdminDashboard/SuperAdminDashboardFeatures/CreateNewSection/CreateNewSection";
import CreateNewSubject from "./Structure/Dashboard/SuperAdminDashboard/SuperAdminDashboardFeatures/CreateNewSubject/CreateNewSubject";
import CreateNewPeriod from "./Structure/Dashboard/SuperAdminDashboard/SuperAdminDashboardFeatures/CreateNewPeriod/CreateNewPeriod";
import Login from "./Structure/Pages/Login/Login";
import Routine from "./Structure/Dashboard/TeacherDashboard/TeacherDasboardFeatures/Routine/Routine";

import ViewerSchoolViewList from "./Structure/Dashboard/ViewerDashboard/ViewerSchoolViewList/ViewerSchoolViewList";
import ViewerDashboard from "./Structure/Dashboard/ViewerDashboard/ViewerDashboard";
import ViewerShowStudentRoutine from "./Structure/Dashboard/ViewerDashboard/ViewerDashboardFeatures/StudentRoutine/ViewerShowStudentRoutine";
import ViewerShowAttendanceView from "./Structure/Dashboard/ViewerDashboard/ViewerDashboardFeatures/ViewerShowAttendance/ViewerShowAttendanceView";
import ClassBasedStudentAbsence from "./Structure/Dashboard/ViewerDashboard/ViewerDashboardFeatures/ViewerShowAttendance/ClassBasedStudentAbsence";
import StudentAbsence from "./Structure/Dashboard/ViewerDashboard/ViewerDashboardFeatures/ViewerShowAttendance/StudentAbsence";
import ShowHomeWork from "./Structure/Dashboard/ViewerDashboard/ViewerDashboardFeatures/ViewerShowHomework/ShowHomeWork";
import SubmitDetails from "./Structure/Dashboard/ViewerDashboard/ViewerDashboardFeatures/ViewerShowHomework/SubmitDetails";
import ViewEvaluation from "./Structure/Dashboard/ViewerDashboard/ViewerDashboardFeatures/ViewEvalutaion/ViewEvaluation";

import StudentRoutine from "./Structure/Dashboard/StudentDashboard/StudentDashboardFeatures/StudentRoutine";
import Home from "./Structure/components/Home/Home";

import SchoolAdminRoutine from "./Structure/Dashboard/SchoolDashboard/SchoolAdminRoutine";
import SchoolAdminNotice from "./Structure/Dashboard/SchoolDashboard/SchoolAdminNotice";
import GradeSheetSchool from "./Structure/Dashboard/SchoolDashboard/GradeSheet";

import TeacherAttendance from "./Structure/Dashboard/TeacherDashboard/TeacherDasboardFeatures/Attendance/TeacherAttendance";

import TeacherHomework from "./Structure/Dashboard/TeacherDashboard/TeacherDasboardFeatures/Homework/TeacherHomework";
import HomeWorkSubmitList from "./Structure/Dashboard/TeacherDashboard/TeacherDasboardFeatures/Homework/HomeWorkSubmitList";

import StudentHomeWork from "./Structure/Dashboard/StudentDashboard/StudentDashboardFeatures/StudentHomeWork/StudentHomeWork";
import StudentHomeWorkSubmit from "./Structure/Dashboard/StudentDashboard/StudentDashboardFeatures/StudentHomeWork/StudentHomeWorkSubmit";
import StudentNoticeList from "./Structure/Dashboard/StudentDashboard/StudentDashboardFeatures/StudentNotice.js/StudentNoticeList";

import HomeWorkShow from './Structure/Dashboard/TeacherDashboard/TeacherDasboardFeatures/Homework/HomeWorkShow';
import AcademicCalender from "./Structure/Dashboard/AcademicCalender/AcademicCalender";
import StudentAcademicCalender from "./Structure/Dashboard/StudentDashboard/StudentDashboardFeatures/AcademicCalender/StudentAcademicCalender";
import TeacherProfile from "./Structure/Dashboard/TeacherDashboard/TeacherProfile/TeacherProfile";
import MarkentryPage from "./Structure/Dashboard/TeacherDashboard/TeacherDasboardFeatures/MarkEntry/MarkEntry";
import ExamMarksEntry from "./Structure/Dashboard/TeacherDashboard/TeacherDasboardFeatures/MarkEntry/TeacherMarkEntry";
import SchoolAdminClassCreate from "./Structure/Dashboard/SchoolDashboard/SchoolAdminClassCreate";
import SchoolAdminSection from "./Structure/Dashboard/SchoolDashboard/schoolAdminSection";
import SchoolAdminSubject from "./Structure/Dashboard/SchoolDashboard/SchoolAdminSubject";
import SchoolAdminPeriod from "./Structure/Dashboard/SchoolDashboard/SchoolAdminPeriod";
import StudentView from "./Structure/Dashboard/StudentDashboard/StudentDashboardFeatures/Evaluation/StudentView";
import EvalutionScheduleStudent from "./Structure/Dashboard/StudentDashboard/StudentDashboardFeatures/Evaluation/EvalutionSchedule";
import ExamMarksSheet from "./Structure/Dashboard/StudentDashboard/StudentDashboardFeatures/Evaluation/ExamMarksSheet";
import GradeSheet from "./Structure/Dashboard/StudentDashboard/StudentDashboardFeatures/Evaluation/GradeSheet";
import Notice from "./Structure/Dashboard/StudentDashboard/StudentDashboardFeatures/Notice/Notice";
import TeacherAcademic from "./Structure/Dashboard/TeacherDashboard/TeacherDasboardFeatures/calender/TeacherAcademic";
import TeacherMarkCheck from "./Structure/Dashboard/TeacherDashboard/TeacherDasboardFeatures/MarkEntry/TeacherMArkCheck";
import StudentProfile from "./Structure/Dashboard/StudentDashboard/StudentProfile/StudentProfile";
import ChangePassword from "./Structure/Dashboard/StudentDashboard/StudentProfile/ChangePassword";
import ViewerCalender from "./Structure/Dashboard/ViewerDashboard/ViewerDashboardFeatures/AcademicCalender/ViewerCalender";
import VierNotice from "./Structure/Dashboard/ViewerDashboard/ViewerDashboardFeatures/Viewer Notice/VierNotice";
import Teacherpassword from "./Structure/Dashboard/TeacherDashboard/TeacherProfile/Teacherpassword";
import ViewActivities from "./Structure/Dashboard/SuperAdminDashboard/SuperAdminDashboardFeatures/ViewActivity/ViewActivities";
import Resources from "./Structure/Dashboard/StudentDashboard/StudentDashboardFeatures/Resources/Resources";
import Library from "./Structure/Dashboard/StudentDashboard/StudentDashboardFeatures/Resources/Library";
import EBook from "./Structure/Dashboard/StudentDashboard/StudentDashboardFeatures/Resources/EBook";
import ImportantLink from "./Structure/Dashboard/StudentDashboard/StudentDashboardFeatures/Resources/ImportantLink";
import ESchool from "./Structure/Dashboard/StudentDashboard/StudentDashboardFeatures/Resources/ESchool";
import StudentPayment from "./Structure/Dashboard/StudentDashboard/StudentDashboardFeatures/StudentPayment/StudentPayment";
import DueInvoice from "./Structure/Dashboard/StudentDashboard/StudentDashboardFeatures/StudentPayment/DueInvoice";
import PaidInvoice from "./Structure/Dashboard/StudentDashboard/StudentDashboardFeatures/StudentPayment/PaidInvoice";
import PayOption from "./Structure/Dashboard/StudentDashboard/StudentDashboardFeatures/StudentPayment/PayOption";
import StudentProfileEdit from "./Structure/Dashboard/StudentDashboard/StudentProfile/StudentProfileEdit";
import CreateExam from "./Structure/Dashboard/SchoolDashboard/CreateExam";
import CreateNewExam from "./Structure/Dashboard/SchoolDashboard/NewExam";
import AddStudent from "./Structure/Dashboard/SchoolDashboard/AddStudent";
import Addteacher from "./Structure/Dashboard/SchoolDashboard/Addteacher";
import Payment from "./Structure/Dashboard/SchoolDashboard/Payment";
import TeacherFeatures from "./Structure/Dashboard/SchoolDashboard/Teacher/teacher";
import RoutineOption from "./Structure/Dashboard/ViewerDashboard/ViewerDashboardFeatures/RoutineOption/RoutineOption";
import StudentNotices from "./Structure/Dashboard/StudentDashboard/StudentDashboardFeatures/StudentNotice.js/StudentNotices";
import AdminNotice from "./Structure/Dashboard/SchoolDashboard/Notice/AdminNotice";
import Notices from "./Structure/Dashboard/SchoolDashboard/Notice/Notices";
import SMSsent from "./Structure/Dashboard/SchoolDashboard/Notice/SMSsent";
import SubjectRegistration from "./Structure/Dashboard/SchoolDashboard/StudentRegistration/SubjectRegistration";
import SMSreport from "./Structure/Dashboard/SchoolDashboard/Notice/SMSreport";
import AdminActivites from "./Structure/Dashboard/SuperAdminDashboard/Activities/AdminActivities";
import StudentActivities from "./Structure/Dashboard/StudentDashboard/StudentDashboardFeatures/StudentActivities/StudentActivities";
import StudentActivitiesSubmit from "./Structure/Dashboard/StudentDashboard/StudentDashboardFeatures/StudentActivities/StudentActivitiesSubmit";
import ListNotice from "./Structure/Dashboard/ViewerDashboard/ViewerDashboardFeatures/Viewer Notice/ListNotice";
import AdminViewActivities from "./Structure/Dashboard/ViewerDashboard/ViewerDashboardFeatures/AdminViewActivities";
import CSVUpload from "./Structure/Dashboard/SchoolDashboard/CSVUpload";
import ExamMarksSheetAll from "./Structure/Dashboard/SchoolDashboard/ExamMarksSheetAll";
import ViewEvaluationList from "./Structure/Dashboard/ViewerDashboard/ViewerDashboardFeatures/ViewEvalutaion/ViewEvaluationList";
import ViewerMarkSheet from "./Structure/Dashboard/ViewerDashboard/ViewerDashboardFeatures/ViewEvalutaion/ViewerMarkSheet";
import GradeSheetTeacher from "./Structure/Dashboard/TeacherDashboard/TeacherDasboardFeatures/MarkEntry/GradeSheet";
import EvalutionSchedule from "./Structure/Dashboard/TeacherDashboard/TeacherDasboardFeatures/MarkEntry/EvalutionSchedule";
import ViewerSubmissionDetails from "./Structure/Dashboard/ViewerDashboard/ViewerDashboardFeatures/ViewerSubmissionDetails";
import ViewerEvalutationSchedule from "./Structure/Dashboard/ViewerDashboard/ViewerDashboardFeatures/ViewEvalutaion/ViewerEvalutationSchedule";
import CreateExamType from "./Structure/Dashboard/SuperAdminDashboard/SuperAdminDashboardFeatures/CreateExamType/CreateExamType";
import ExtraMarkentry from "./Structure/Dashboard/TeacherDashboard/TeacherDasboardFeatures/MarkEntry/ExtraMarkentry";
import ExtraReport from "./Structure/Dashboard/TeacherDashboard/TeacherDasboardFeatures/MarkEntry/ExtraReport";
import TeacherProfileEdit from "./Structure/Dashboard/TeacherDashboard/TeacherProfile/TeacherProfileEdit";
import SchoolSMSreport from "./Structure/Dashboard/SuperAdminDashboard/SuperAdminDashboardFeatures/SchoolSMSreport";
import ExtraDetails from "./Structure/Dashboard/TeacherDashboard/TeacherDasboardFeatures/MarkEntry/ExtraDetails";
import PaidList from "./Structure/Dashboard/ViewerDashboard/ViewerDashboardFeatures/Payment/PaidList";
import CreateSmsLimit from "./Structure/Dashboard/SuperAdminDashboard/SuperAdminDashboardFeatures/CreateSmsLimit/CreateSmsLimit";
import SmsPayment from "./Structure/Dashboard/SchoolDashboard/SmsPayment";
import TeacherProfilebyId from "./Structure/Dashboard/TeacherDashboard/TeacherProfile/TeacherProfilebyId";
import SuperAdminProfile from "./Structure/Dashboard/SuperAdminDashboard/SuperAdminProfile/SuperAdminProfile";
import SchoolProfile from "./Structure/Dashboard/SchoolDashboard/SchoolProfile/SchoolProfile";
import SchoolProfileEdit from "./Structure/Dashboard/SchoolDashboard/SchoolProfile/SchoolProfileEdit";
import ChangeSchoolPassword from "./Structure/Dashboard/SchoolDashboard/SchoolProfile/ChangePassword";
import ViewerProfile from "./Structure/Dashboard/ViewerDashboard/ViewerProfile/ViewerProfile";
import ViewerProfileEdit from "./Structure/Dashboard/ViewerDashboard/ViewerProfile/ViewerProfileEdit";
import ChangeViewerPassword from "./Structure/Dashboard/ViewerDashboard/ViewerProfile/ChangePassword";
import SuperAdminProfileEdit from "./Structure/Dashboard/SuperAdminDashboard/SuperAdminProfile/SuperAdminProfileEdit";
import ChangeSuperPassword from "./Structure/Dashboard/SuperAdminDashboard/SuperAdminProfile/ChangeSuperPassword";
import TeacherAttendanceReport from "./Structure/Dashboard/TeacherDashboard/TeacherDasboardFeatures/Attendance/TeacherAttendanceReport";

function App(props) {
  const [user_code, setUser_code] = useState("");
  const [user_type, setUser_type] = useState(0);
  const [homeworkid, setHomeworkid] = useState("");

  return (
    <div className="App">
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route
            path="/super-admin"
            element={<SuperAdminDashboard user={[user_code, user_type]} />}
          />
          <Route
            path="/school-admin"
            element={<SchoolDashboard />}
          />
          <Route
            path="/teacher-admin"
            element={<TeacherDashboard user={[user_code, user_type]} />}
          />
          <Route
            path="/student-admin"
            element={<StudentDashboard user={[user_code, user_type]} />}
          />

          <Route path="/viewer-school" element={<ViewerSchoolViewList />} />
          <Route path="/viewer-admin" element={<ViewerDashboard />} />
          <Route path="/viewer-calender" element={<ViewerCalender />} />
          <Route path="/viewer-notice" element={<ListNotice />} />
          <Route path="/show-notice" element={<VierNotice />} />
          <Route path="/viewerRoutine" element={<RoutineOption
          />} />
          <Route
            path="/viewershowstudentroutine"
            element={<ViewerShowStudentRoutine />}
          />
          <Route path="/viewevaluation" element={<ViewEvaluation />} />

          <Route path="/viewevaluationlist" element={<ViewEvaluationList />} />
          <Route path="/view-mark-sheet" element={<ViewerMarkSheet />} />
          <Route
            path="/viewershowattendanceview"
            element={<ViewerShowAttendanceView />}
          />
          <Route path="/student-activity" element={<StudentActivities />} />
          <Route path="/studentActivitiesSubmit" element={<StudentActivitiesSubmit />} />
          <Route
            path="/classbasedstudentabsence"
            element={<ClassBasedStudentAbsence />}
          />
          <Route path="/studentabsence" element={<StudentAbsence />} />
          <Route path="/student-resource" element={<Resources />} />
          <Route path="/studentlibrary" element={<Library />} />
          <Route path="/studentebook" element={<EBook />} />
          <Route path="/studentimportantlink" element={<ImportantLink />} />
          <Route path="/studentimport ViewActivities from './Structure/Dashboard/ViewerDashboard/ViewerDashboardFeatures/ViewActivities';
-eschool" element={<ESchool />} />
          <Route path="/student-payment" element={<StudentPayment />} />
          <Route path="/studentprofileedit" element={<StudentProfileEdit />} />
          <Route path="/teacherprofileedit" element={<TeacherProfileEdit />} />
          <Route path="/dueinvoice" element={<DueInvoice />} />
          <Route path="/payoption" element={<PayOption />} />
          <Route path="/paidinvoice" element={<PaidInvoice />} />
          <Route path="/studentnotice" element={<Notice />} />
          <Route path="/showhomework" element={<ShowHomeWork />} />
          <Route path="/submitdetails" element={<SubmitDetails />} />
          <Route path="/studentEvaluation" element={<StudentView />} />
          <Route path="/marksheet" element={<ExamMarksSheet user={[user_code, user_type]} />} />
          <Route path="/gradesheet" element={<GradeSheet user={[user_code, user_type]} />} />
          <Route path="/teacher-calender" element={<TeacherAcademic user={[user_code, user_type]} />} />
          <Route path="/teachermark" element={<TeacherMarkCheck user={[user_code, user_type]} />} />
          <Route path="/teacherpassword" element={<Teacherpassword />} />

          <Route path="/add-school" element={<AddNewSchool />} />
          <Route path="/add-organization" element={<CreateNewOrganization />} />
          <Route path="/create-class" element={<CreateNewClass />} />
          <Route path="/section_create" element={<CreateNewSection />} />
          <Route path="/create-subject" element={<CreateNewSubject />} />
          <Route path="/create-period" element={<CreateNewPeriod />} />
          <Route path="/create-exam" element={<CreateExam />} />
          <Route path="/newExam" element={<CreateNewExam />} />
          <Route
            path="/login"
            element={<Login setUser={[setUser_code, setUser_type]} />}
          />
          <Route
            path="/routine"
            element={<Routine user={[user_code, user_type]} />}
          />
          <Route
            path="/studentroutine"
            element={<StudentRoutine user={[user_code, user_type]} />}
          />
          <Route path="/attendance" element={<Attendance />} />

          <Route path="/paidList" element={<PaidList />} />

          <Route path="/teacherprofile" element={<TeacherProfile />} />

          <Route
            path="/teacherattendance"
            element={<TeacherAttendance user={[user_code, user_type]} />}
          />
          <Route
            path="/teacherattendancereport"
            element={<TeacherAttendanceReport user={[user_code, user_type]} />}
          />
          <Route
            path="/studentviewattendance"
            element={<StudentAttendanceView user={[user_code, user_type]} />}
          />
          <Route path="/schooladminroutine" element={<SchoolAdminRoutine />} />
          <Route path="/schooladminnotice" element={<SchoolAdminNotice />} />
          <Route path="/class-create" element={<SchoolAdminClassCreate />} />
          <Route path="/section-create" element={<SchoolAdminSection />} />
          <Route path="/subject-create" element={<SchoolAdminSubject />} />
          <Route path="/period-create" element={<SchoolAdminPeriod />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/add-teacher" element={<Addteacher />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/add-teacher" element={<TeacherFeatures />} />
          <Route
            path="/teacherhomework"
            element={
              <TeacherHomework
                user={[user_code, user_type]}
                selecthw={setHomeworkid}
              />
            }
          />
          <Route
            path="/activityshow"
            element={
              <ViewActivities
                user={[user_code, user_type]}
                selecthw={setHomeworkid}
              />
            }
          />
          <Route
            path="/activityTeachershow"
            element={
              <ExtraDetails
                user={[user_code, user_type]}
                selecthw={setHomeworkid}
              />
            }
          />
          <Route
            path="/homeworksubmitlist"
            element={
              <HomeWorkSubmitList
                user={[user_code, user_type]}
                selectedhw={homeworkid}
              />
            }
          />

          <Route
            path="/homeworkshow"
            element={
              <HomeWorkShow
              />
            }
          />
          <Route
            path="/teachernotice"
            element={
              <TeacherNotice
              // user={[user_code, user_type]}
              // selecthw={setHomeworkid}
              />
            }
          />
          <Route path="/markentry" element={<MarkentryPage />} />
          <Route path="/teacherevaluation" element={<ExamMarksEntry
            user={[user_code, user_type]} />} />
          <Route
            path="/studenthomework"
            element={
              <StudentHomeWork
                user={[user_code, user_type]}
                selecthw={setHomeworkid}
              />
            }
          />
          <Route
            path="/studenthomeworksubmit"
            element={
              <StudentHomeWorkSubmit
                user={[user_code, user_type]}
                selectedhw={homeworkid}
              />
            }
          />
          <Route
            path="/academic-calender"
            element={<AcademicCalender user={[user_code, user_type]} />}
          />
          <Route
            path="/student-academic-calender"
            element={<StudentAcademicCalender user={[user_code, user_type]} />}
          />
          <Route
            path="/studentprofile"
            element={<StudentProfile />}
          />
          <Route
            path="/studentpassword"
            element={<ChangePassword />}
          />
          <Route
            path="/student-notice-list"
            element={<StudentNoticeList user={[user_code, user_type]} />}
          />          
          <Route
            path="/student-notices"
            element={<StudentNotices user={[user_code, user_type]} />}
          />
          <Route
            path="/admin-notices"
            element={<AdminNotice user={[user_code, user_type]} />}
          />
          <Route
            path="/admin-notice-sms"
            element={<Notices user={[user_code, user_type]} />}
          />
          <Route
            path="/admin-sms-sent"
            element={<SMSsent user={[user_code, user_type]} />}
          />          
          <Route
            path="/sms-report"
            element={<SMSreport user={[user_code, user_type]} />}
          />   
          <Route
            path="/subjectregistration"
            element={<SubjectRegistration user={[user_code, user_type]} />}
          />        
          <Route
            path="/admin-activities"
            element={<AdminActivites user={[user_code, user_type]} />}
          />        
          <Route
            path="/super-admin-activities"
            element={<AdminViewActivities user={[user_code, user_type]} />}
          />        
          <Route
            path="/csv-upload"
            element={<CSVUpload user={[user_code, user_type]} />}
          />        
          <Route
            path="/create-mark-sheet"
            element={<ExamMarksSheetAll user={[user_code, user_type]} />}
          />        
          <Route
            path="/csv-upload"
            element={<CSVUpload user={[user_code, user_type]} />}
          />        
          <Route
            path="/teacherGradeSheet"
            element={<GradeSheetTeacher user={[user_code, user_type]} />}
          />        
          <Route
            path="/school-grade-sheet"
            element={<GradeSheetSchool user={[user_code, user_type]} />}
          />        
          <Route
            path="/evalutionScheduleTeacher"
            element={<EvalutionSchedule user={[user_code, user_type]} />}
          />        
          <Route
            path="/evalutionScheduleStudent"
            element={<EvalutionScheduleStudent user={[user_code, user_type]} />}
          />        
          <Route
            path="/viewerSubmissionDetails"
            element={<ViewerSubmissionDetails user={[user_code, user_type]} />}
          />        
          <Route
            path="/viewerEvalutationSchedule"
            element={<ViewerEvalutationSchedule user={[user_code, user_type]} />}
          />        
          <Route
            path="/newExamType"
            element={<CreateExamType user={[user_code, user_type]} />}
          />        
          <Route
            path="/extraMarkEntry"
            element={<ExtraMarkentry user={[user_code, user_type]} />}
          />        
          <Route
            path="/extraMarkReport"
            element={<ExtraReport user={[user_code, user_type]} />}
          />        
          <Route
            path="/school-wise-sms-report"
            element={<SchoolSMSreport user={[user_code, user_type]} />}
          />        
          <Route
            path="/school-wise-sms-limit"
            element={<CreateSmsLimit user={[user_code, user_type]} />}
          />        
          <Route
            path="/sms-payment"
            element={<SmsPayment user={[user_code, user_type]} />}
          />        
          <Route
            path="/teacherProfileById/:id"
            element={<TeacherProfilebyId user={[user_code, user_type]} />}
          />        
          <Route
            path="/school-admin-profile"
            element={<SchoolProfile user={[user_code, user_type]} />}
          />        
          <Route
            path="/schoolprofileedit"
            element={<SchoolProfileEdit user={[user_code, user_type]} />}
          />        
          <Route
            path="/schoolpassword"
            element={<ChangeSchoolPassword user={[user_code, user_type]} />}
          />        
          <Route
            path="/viewer-profile"
            element={<ViewerProfile user={[user_code, user_type]} />}
          />        
          <Route
            path="/viewerprofileedit"
            element={<ViewerProfileEdit user={[user_code, user_type]} />}
          />        
          <Route
            path="/viewerpassword"
            element={<ChangeViewerPassword user={[user_code, user_type]} />}
          />        
          <Route
            path="/super-admin-profile"
            element={<SuperAdminProfile user={[user_code, user_type]} />}
          />        
          <Route
            path="/superadminprofileedit"
            element={<SuperAdminProfileEdit user={[user_code, user_type]} />}
          />        
          <Route
            path="/superadminpassword"
            element={<ChangeSuperPassword user={[user_code, user_type]} />}
          />        
              
              
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
