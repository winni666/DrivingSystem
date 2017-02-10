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

            var signtime = DateTime.Now.ToString("yyyy-MM-dd");

            var user = "文丽";

            if (studentcount > 0)
                return Json(new { success = false, reason = "学员名称已经存在！" }, JsonRequestBehavior.AllowGet);
            else
            {
                var uid = Guid.NewGuid().ToString();

                db.T("insert into students(Id, Name, Sex, Age, Phone, CardId, SignDate, SignPoint, Photo, IsTuition, State, SignDriving, SignUser, Remarks) values({...})", uid, student.Name, student.Sex, student.Age, student.Phone, student.CardId, signtime, student.SignPoint, student.Photo, student.IsTuition, student.State, student.SignDriving, user, student.Remarks).Execute();

                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}