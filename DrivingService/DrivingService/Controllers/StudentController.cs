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
    public class StudentController : Controller
    {
        private static SqlDbExecutor db = SqlServer.FromConfiguration("connection");
        public object List()
        {
            var list = db.T("select * from students").ExecuteDataTable();

            return Content(JsonConvert.SerializeObject(list), "application/json");
        }
        public object Add(Student student)
        {
            dynamic studentcount = db.T("select count(*) from students where Name = {0}", student.Name).ExecuteScalar();

            var signtime = DateTime.Now;

            var user = "文丽";//登记用户，photo？

            if (studentcount > 0)
                return Json(new { success = false, reason = "学员名称已经存在！" }, JsonRequestBehavior.AllowGet);
            else
            {
                var uid = Guid.NewGuid().ToString();

                db.T("insert into students(Id, Name, Sex, Age, Phone, CardId, SignDate, SignPoint, Photo, IsTuition, State, SignDriving, SignUser, Remarks) values({...})", uid, student.Name, student.Sex, student.Age, student.Phone, student.CardId, signtime, student.SignPoint, student.Photo, student.IsTuition, student.State, student.SignDriving, user, student.Remarks).Execute();

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
            var list = db.T("select * from students where Id={0}", Id).ExecuteDynamicObject();
            return Content(JsonConvert.SerializeObject(list), "application/json");
        }
        //public object Edit(Student students)
        //{
        //    dynamic student = db.T("select count(*) from students where Name={0}", students.Name).ExecuteScalar();
        //    dynamic self = db.T("select * from students where Id={0}", students.Id).ExecuteDynamicObject();
        //    if (student > 0 && (string)self.Name != students.Name)
        //    {
        //        return Json(new { success = false, reason = "学员名称已存在！" }, JsonRequestBehavior.AllowGet);
        //    }
        //    else
        //    {
        //        db.T("update students set Name = {0},")
        //    }
        //}
    }
}