using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Ivony.Data;
using Ivony.Data.SqlClient;
using Newtonsoft.Json;
using DrivingService.Models;
using Newtonsoft.Json.Linq;

namespace DrivingService.Controllers
{
    public class StudentController : Controller
    {
        private static SqlDbExecutor db = SqlServer.FromConfiguration("connection");

        public object List()
        {
            var list = db.T("select * from students ").ExecuteDataTable();

            return Content(JsonConvert.SerializeObject(list), "application/json");
        }
        public object Add(Student student, string user_Name, string CardId, string Driving_Type)
        {
            dynamic studentcount = db.T("select count(*) from students where CardId = {0}", student.CardId).ExecuteScalar();//身份证验证是否重复报名

            //继续验证已拿驾驶证是否覆盖了当前要报名的驾驶证车型。
            ////获取是否已获取A1
            string[] testList1 = { "A3", "B1", "B2", "C1", "C2", "C3", "C4", "M" };

            if (testList1.Contains(student.SignDriving) && string.IsNullOrEmpty(student.CardId) == false)
            {

                var hasGet = db.T("select count(*) from driving where Card_Id={0} and Driving_Type='A1'", CardId).ExecuteScalar();

                if ((int)hasGet > 0)
                    return Json(new { success = false, reason = "已取得A1！" }, JsonRequestBehavior.AllowGet);
            }
            // //获取是否已获取A2
            string[] testList2 = { "B1", "B2", "C1", "C2", "C3", "C4", "M" };

            if (testList2.Contains(student.SignDriving) && string.IsNullOrEmpty(student.CardId) == false)
            {

                var hasGet = db.T("select count(*) from driving where Card_Id={0} and Driving_Type='A2'", CardId).ExecuteScalar();

                if ((int)hasGet > 0)
                    return Json(new { success = false, reason = "已取得A2！" }, JsonRequestBehavior.AllowGet);
            }
            ////获取是否已获取A3
            string[] testList3 = { "C1", "C2", "C3", "C4" };

            if (testList3.Contains(student.SignDriving) && string.IsNullOrEmpty(student.CardId) == false)
            {

                var hasGet = db.T("select count(*) from driving where Card_Id={0} and Driving_Type='A3'", CardId).ExecuteScalar();

                if ((int)hasGet > 0)
                    return Json(new { success = false, reason = "已取得A3！" }, JsonRequestBehavior.AllowGet);
            }
            ////获取是否已获取B1
            string[] testList4 = { "C1", "C2", "C3", "C4", "M" };

            if (testList4.Contains(student.SignDriving) && string.IsNullOrEmpty(student.CardId) == false)
            {

                var hasGet = db.T("select count(*) from driving where Card_Id={0} and Driving_Type='B1'", CardId).ExecuteScalar();

                if ((int)hasGet > 0)
                    return Json(new { success = false, reason = "已取得B1！" }, JsonRequestBehavior.AllowGet);
            }
            ////获取是否已获取B2
            if (testList4.Contains(student.SignDriving) && string.IsNullOrEmpty(student.CardId) == false)
            {

                var hasGet = db.T("select count(*) from driving where Card_Id={0} and Driving_Type='B2'", CardId).ExecuteScalar();

                if ((int)hasGet > 0)
                    return Json(new { success = false, reason = "已取得B2！" }, JsonRequestBehavior.AllowGet);
            }
            ////获取是否已获取C1
            string[] testList5 = { "C2", "C3", "C4" };
            if (testList5.Contains(student.SignDriving) && string.IsNullOrEmpty(student.CardId) == false)
            {

                var hasGet = db.T("select count(*) from driving where Card_Id={0} and Driving_Type='C1'", CardId).ExecuteScalar();

                if ((int)hasGet > 0)
                    return Json(new { success = false, reason = "已取得C1！" }, JsonRequestBehavior.AllowGet);
            }
            var signtime = DateTime.Now;

            var user = user_Name;

            var IsPhysical = "否";

            var IsTuition = "否";

            if (studentcount > 0)
                return Json(new { success = false, reason = "此学员已经报名！" }, JsonRequestBehavior.AllowGet);
            else
            {
                var uid = Guid.NewGuid().ToString();

                db.T(@"insert into students(Id, Name, Sex, Age, Phone, CardId, SignDate, SignPoint, Photo,  State, SignDriving, SignUser, Remarks,IsPhysical,IsTuition) values({...})"
, uid, student.Name, student.Sex, student.Age, student.Phone, student.CardId, signtime, student.SignPoint, student.Photo, student.State, student.SignDriving, user, student.Remarks, IsPhysical, IsTuition).Execute();

                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }
        }
        public object Delete(string Name)
        {
            db.T("DELETE FROM students WHERE Name={0} ", Name).Execute();
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);

        }

        public object Info(string Id)
        {
            //var list = db.T("select * from students,test where students.Id=TestStudentId and students.Id={0}", Id).ExecuteDataTable();


            var info = db.T("select * from students where Id={0}", Id).ExecuteDynamicObject();
            var test = db.T("select * from test where TestStudentId={0}", Id).ExecuteDataTable();

            var data = JObject.FromObject(new
            {
                Profile = info,
                TestInfo = test
            });

            return Content(JsonConvert.SerializeObject(data), "application/json");
        }
        public object Edit(Student students)
        {

            var updateTime = DateTime.Now;
            db.T("update students set Name = {0},Sex={1},Age={2},Phone={3}, CardId={4}, SignDate={5}, SignPoint={6}, Photo={7},  State={8}, SignDriving={9},  Remarks={10},IsPhysical={12} where Id={13}",
                students.Name, students.Sex, students.Age, students.Phone, students.CardId, updateTime, students.SignPoint, students.Photo, students.State, students.SignDriving, students.Remarks, students.IsPhysical, students.Id).Execute();
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);

        }

        public object EditPhysical(string Id)
        {
            db.T("update students set IsPhysical ='合格' where Id={0}", Id).Execute();
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }
        public object EditTuition(string Id)
        {
            var hasPhysica = db.T("select IsPhysical from students where Id={0}", Id).ExecuteScalar();

            if ((string)hasPhysica == "否")
            {
                return Json(new { success = false, reason = "缴费失败，请体检合格后再缴费！" }, JsonRequestBehavior.AllowGet);
            }

            db.T("update students set IsTuition ='已缴费' where Id={0}", Id).Execute();
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }

    }
}