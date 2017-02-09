using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Ivony.Data;
using Ivony.Data.SqlClient;
using Newtonsoft.Json;

namespace DrivingService.Controllers
{
    public class UserController : Controller
    {
        private static SqlDbExecutor db = SqlServer.FromConfiguration("connection");
        // GET: User
        public object List()
        {
            var list = db.T("select * from users").ExecuteDataTable();

            return Content(JsonConvert.SerializeObject(list), "application/json");
        }

        public object Info(string user_Id)
        {
            var list = db.T("select * from users where user_Id={0}", user_Id).ExecuteDynamicObject();

            return Content(JsonConvert.SerializeObject(list), "application/json");
        }

        public object Add(string user_Name, string user_Password, string user_Type, string user_Point)
        {
            if (string.IsNullOrWhiteSpace(user_Name))
                return Json(new { success = false, reason = "用户名不能为空！" }, JsonRequestBehavior.AllowGet);

            if (string.IsNullOrWhiteSpace(user_Password))
                return Json(new { success = false, reason = "密码不能为空！" }, JsonRequestBehavior.AllowGet);

            dynamic user = db.T("select count(*) from users where user_Name = {0}", user_Name).ExecuteScalar();

            if (user > 0)
                return Json(new { success = false, reason = "用户已经存在！" }, JsonRequestBehavior.AllowGet);
            else
            {
                var uid = Guid.NewGuid().ToString();

                db.T("insert into users(user_Id, user_Name, user_Password, user_Type,user_Point) values({0}, {1}, {2}, {3},{4})", uid, user_Name, user_Password, user_Type, user_Point).Execute();

                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }
        }

        public object Delete(string user_Name)
        {
            db.T("DELETE FROM users WHERE user_Name={0} ", user_Name).Execute();
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public object Login(string user_Name, string user_Password)
        {
            dynamic user = db.T("select * from users where user_Name = {0} and user_Password = {1}", user_Name, user_Password).ExecuteDynamicObject();

            if (user == null)
                return Json(new { success = false, reason = "用户名或者密码错误！" }, JsonRequestBehavior.AllowGet);
            else
            {
                return Json(new { success = true, userId = user.user_Id.ToString() }, JsonRequestBehavior.AllowGet);
            }
        }
        public object Edit(string user_Id, string user_Name, string user_Password, string user_Type, string user_Point)
        {
            if (string.IsNullOrWhiteSpace(user_Name))
                return Json(new { success = false, reason = "用户名不能为空！" }, JsonRequestBehavior.AllowGet);

            if (string.IsNullOrWhiteSpace(user_Password))
                return Json(new { success = false, reason = "密码不能为空！" }, JsonRequestBehavior.AllowGet);

            dynamic user = db.T("select count(*) from users where user_Name = {0}", user_Name).ExecuteScalar();//用户名是否存在

            dynamic self = db.T("select * from users where user_Id={0}", user_Id).ExecuteDynamicObject();//自己的用户名

            if (user > 0 && (string)self.user_Name != user_Name)
            {
                return Json(new { success = false, reason = "用户已经存在！" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                db.T("update users set user_Name={0},user_Password={1},user_Type={2},user_Point={3} where user_Id={4}", user_Name, user_Password, user_Type, user_Point, user_Id).Execute();
                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }

        }

        
    }
}