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
    public class DrivingController : Controller
    {
        private static SqlDbExecutor db = SqlServer.FromConfiguration("connection");

        public object DrivingList()
        {
            var list = db.T("select * from driving").ExecuteDataTable();
            return Content(JsonConvert.SerializeObject(list), "application/json");
        }
        public object getdriving(string Driving_Card, string Gave_User,string id) 
        {
            var date = DateTime.Now;
            db.T("update driving set Get_Date={0},Gave_User={1} where Driving_Card={2}", date, Gave_User, Driving_Card).Execute();
            db.T("update students set State='已领证' where CardId={0}", id).Execute();
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }
        

    }
}