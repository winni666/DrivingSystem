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
    public class TestController : Controller
    {
        private static SqlDbExecutor db = SqlServer.FromConfiguration("connection");

        // GET: Test
        public object List()
        {
            var list = db.T("select * from students,test where students.Id=test.TestStudentId").ExecuteDataTable();
            return Content(JsonConvert.SerializeObject(list), "application/json");
        }
        //获取可考试的学生
        public object TestStudent(string Subject, string Driving, string SignUser = "")
        {
            dynamic StudentList;

            if (Subject == "科目一")
            {

                StudentList = db.T("select * from students where SignUser like '%" + SignUser + "%' and IsTuition = '已缴费' and SignDriving={0} and Id not in(select TestStudentId from test where TestSubject = {1} and TestScore >= PassLine)", Driving, Subject).ExecuteDataTable();
            }

            else
            {
                //已经交费，某个科目没有考及格,我的/全部的学生,必须验证上一个科目是否已经通过
                var filters = new List<string>();

                filters.Add("students.Id = test.TestStudentId");
                filters.Add("TestScore > PassLine");

                switch (Subject)
                {
                    case "科目二":
                        filters.Add("test.TestSubject='科目一'");
                        
                        break;
                    case "科目三":
                        filters.Add("test.TestSubject='科目二'");
                        break;
                    case "科目四":
                        filters.Add("test.TestSubject='科目三'");
                        break;
                    case "科目五":
                        filters.Add("test.TestSubject='科目四'");
                        break;
                }

                StudentList = db.T("select * from students,test where SignUser like '%" + SignUser + "%' and IsTuition = '已缴费' and SignDriving={0} and " + string.Join(" and ", filters) + " and Id not in(select TestStudentId from test where TestSubject = {1} and TestScore >= PassLine)", Driving, Subject).ExecuteDataTable();


            }
            return Content(JsonConvert.SerializeObject(StudentList), "application/json");


        }

        //安排考试
        public object AddTest(string subject, string date, string room, string driving, string ids)
        {
            decimal PassLine = 90;

            decimal TestScore = 0;

            if (subject == "科目二")
            {
                PassLine = 80;
            }

            string[] list = ids.Split(',');

            foreach (var id in list)
            {
                if (!string.IsNullOrEmpty(id))
                    db.T("insert into test (TestTime, TestSubject, TestStudentId,PassLine, TestRoom,TestScore,drivingtype) values ({...})", date, subject, id, PassLine, room, TestScore, driving).Execute();
            }
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }
        public object AddScore(string testid, string score)
        {
            db.T("update test set TestScore = {0} where TestID = {1}", score, testid).Execute();
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }
        //加入领证表
        public object AddDrivingList(string cardid, string name, string drivingtype)
        {
            db.T("insert into driving (Card_Id, Name, Driving_Type) values ({...})", cardid, name, drivingtype).Execute();
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }

        public object select(string Name = null, string Subject = null)
        {
            var filters = new List<string>();

            if (!string.IsNullOrEmpty(Name))
            {
                filters.Add("students.Id = test.TestStudentId");
                filters.Add("students.Name='" + Name + "'");
            }

            if (!string.IsNullOrEmpty(Subject))
            {
                filters.Add("students.Id = test.TestStudentId");
                filters.Add("TestSubject='" + Subject + "'");

            }

            var list = db.T("select * from test,students where " + string.Join(" and ", filters)).ExecuteDataTable();

            return Content(JsonConvert.SerializeObject(list), "application/json");
        }
    }
}