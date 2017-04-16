using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Ivony.Data;
using Ivony.Data.SqlClient;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace DrivingService.Controllers
{
    public class OtherController : Controller
    {

        private static SqlDbExecutor db = SqlServer.FromConfiguration("connection");
        public object NewsList()
        {
            var list = db.T("select * from news").ExecuteDataTable();
            return Content(JsonConvert.SerializeObject(list), "application/json");
        }
        public object deletenews(string news_id)
        {
            db.T("delete from news where news_id={0} ", news_id).Execute();
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }
        public object NewsInfo(string news_id)
        {
            var list = db.T("select * from news where news_id={0}", news_id).ExecuteDynamicObject();
            return Content(JsonConvert.SerializeObject(list), "application/json");
        }
        public object NewsAdd(string news_title, string news_content, string news_author)
        {
            var date = DateTime.Now.ToString("yyyy/MM/dd");

            db.T("insert into news (news_title, news_date, news_content,news_author) values({...})", news_title, date, news_content, news_author).Execute();

            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }
        //统计各教练的及格率
        public object DrivingStatics()
        {
            var list = db.T("select SignDriving,count(SignDriving) As Count from students group by SignDriving").ExecuteDataTable();
            return Content(JsonConvert.SerializeObject(list), "application/json");
        }
        public object register()
        {
            var list = new JArray();

            for (var i = 1; i < 13; i++)
            {
                var nowDate = DateTime.Now;

                var beginDate = new DateTime(nowDate.Year, nowDate.Month, 1).AddMonths(-i);

                var endDate = new DateTime(nowDate.Year, nowDate.Month, 1).AddMonths(-i + 1);

                var count = db.T("select count(*) from students where SignDate >{0} and SignDate <{1} ", beginDate, endDate).ExecuteScalar();

                list.Add(JObject.FromObject(new
                {
                    BeginDate = beginDate,
                    EndDate = endDate,
                    Count = count
                }));
            }

            return Content(JsonConvert.SerializeObject(list), "application/json");
        }
    }
}