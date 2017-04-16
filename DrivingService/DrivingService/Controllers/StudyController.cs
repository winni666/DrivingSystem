using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Ivony.Data;
using Ivony.Data.SqlClient;
using Newtonsoft.Json;
using DrivingService.Models;

namespace DrivingService.Controllers
{
    public class StudyController : Controller
    {
        private static SqlDbExecutor db = SqlServer.FromConfiguration("connection");
        // GET: Study
        public object List()
        {
            var list = db.T("select * from study,teacher,students where Study_teacherId = Teacher_Id and Study_studentid = Id").ExecuteDataTable();
            return Content(JsonConvert.SerializeObject(list), "application/json");
        }
        public object delete(string Study_Id)
        {
            db.T("delete from study where Study_Id={0} ", Study_Id).Execute();
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }

        public object finish(string Study_Id)
        {
            db.T("update study set Study_sate ='已完成' where Study_Id={0}", Study_Id).Execute();
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }

        public object AddStudy(study study, string ids)
        {

            dynamic carName = db.T("select car_name from car where car_number = {0}", study.Study_carnumber).ExecuteScalar();

            var courseNumber = Guid.NewGuid().ToString();

            var state = "未完成";

            var date = DateTime.Now;

            string[] list = ids.Split(',');

            var count = list.Count();

            foreach (var id in list)
            {
                if (!string.IsNullOrEmpty(id))
                    db.T(@"insert into study (Study_studentid,Study_driving, Study_subject,Study_carnumber,
Study_carname,Study_teacherId, Study_time,Study_CourseNumber,Study_sate, Study_date, study_room) values({...})",
                    id, study.Study_driving, study.Study_subject, study.Study_carnumber, (string)carName,
                    study.Study_teacherId, study.Study_time, courseNumber, state, date.ToString("MM/dd/yyyy"), study.study_room).Execute();
            }
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }
        //可用的教练
        public object SelectTeacher(string time, string subject, string driving,string date)
        {
            var d = Convert.ToDateTime(date).ToString("MM/dd/yyyy");
            var list = db.T("select * from teacher where Teacher_Subject={0} and Teacher_Driving={1} and Teacher_Time={2} and Teacher_Id not in (select Study_teacherId from study where Study_date ={3} and Study_time={4})",subject,driving,time,d,time).ExecuteDataTable();
            return Content(JsonConvert.SerializeObject(list), "application/json");
            
        }
        //可用的车
        public object SelectCar(string time,string driving, string date)
        {
            var d = Convert.ToDateTime(date).ToString("MM/dd/yyyy");
            var list = db.T("select * from car where car_type={0} and car_number not in (select Study_carnumber from study where Study_date ={1} and Study_time={2} and Study_driving={3})", driving, d, time, driving).ExecuteDataTable();
            return Content(JsonConvert.SerializeObject(list), "application/json");
        }
        //可学车的学生
        public object SelectStudent(string time, string driving, string date, string subject)
        {
            var d = Convert.ToDateTime(date).ToString("MM/dd/yyyy");
            var list = db.T("select * from students where IsTuition = '已缴费' and SignDriving = {0} and Id not in (select TestStudentId from test where TestSubject = {1} and TestScore >= PassLine) and Id not in (select Study_studentid from study where Study_time ={2} and Study_date={3} and Study_sate='未完成')",driving, subject,time,d).ExecuteDataTable();
            return Content(JsonConvert.SerializeObject(list), "application/json");
        }

    }
}