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

        public object Add(string user_Name, string user_Password, string user_Type)
        {
            dynamic user = db.T("select count(*) from users where user_Name = {0}", user_Name).ExecuteScalar();

            if (user > 0)
                return Json(new { success = false, reason = "用户已经存在！" }, JsonRequestBehavior.AllowGet);
            else
            {
                var uid = Guid.NewGuid().ToString();

                db.T("insert into users(user_Id, user_Name, user_Password, user_Type) values({0}, {1}, {2}, {3})", uid, user_Name, user_Password, user_Type).Execute();

                return Json(new { success = true }, JsonRequestBehavior.AllowGet);
            }


        }
        public object Delete(string user_Name)
        {
            db.T("DELETE FROM users WHERE user_Name={0} ", user_Name).Execute();
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);

        }
    }
}