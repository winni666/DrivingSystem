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
    public class TeacherController : Controller
    {
        // GET: Teacher
        private static SqlDbExecutor db = SqlServer.FromConfiguration("connection");
        public object List()
        {
            var list = db.T("select * from teacher order by Teacher_Name").ExecuteDataTable();
            return Content(JsonConvert.SerializeObject(list), "application/json");
        }
        public object delete(string Teacher_Id)
        {
            db.T("delete from teacher where Teacher_Id={0} ", Teacher_Id).Execute();
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }

        public object info(string Teacher_Id)
        {
            var list = db.T("select * from teacher where Teacher_Id={0}", Teacher_Id).ExecuteDynamicObject();
            return Content(JsonConvert.SerializeObject(list), "application/json");
        }
        public object Edit(string Teacher_Id, string Teacher_Driving, string Teacher_Subject, string Teacher_Time,string Teacher_Remark)
        {
            db.T("update teacher set Teacher_Driving={0},Teacher_Subject={1},Teacher_Time={2},Teacher_Remark={3} where Teacher_Id={4}", Teacher_Driving, Teacher_Subject, Teacher_Time, Teacher_Remark, Teacher_Id).Execute();
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }

        public object add(string Teacher_Name, string Teacher_Driving, string Teacher_Subject, string Teacher_Time, string Teacher_number, string Teacher_Remark)
        {
            //验证身份证对应相同的名称
            dynamic count = db.T("select count(*) from teacher where Teacher_number = {0}", Teacher_number).ExecuteScalar();

            dynamic name = db.T("select Teacher_Name from teacher where Teacher_number = {0}", Teacher_number).ExecuteScalar();


            if (count > 0 && Teacher_Name!= name)
            {
                return Json(new { success = false, reason = "教练身份证号和姓名不符！" }, JsonRequestBehavior.AllowGet);
            }
            db.T("insert into teacher (Teacher_Name, Teacher_Subject, Teacher_Driving, Teacher_Time, Teacher_Remark, Teacher_number) values({...})", Teacher_Name, Teacher_Subject, Teacher_Driving, Teacher_Time, Teacher_Remark, Teacher_number).Execute();

            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }
    }
}