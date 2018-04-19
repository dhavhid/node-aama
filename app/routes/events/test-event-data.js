exports.single = {
  "DataSet": {
    "xs:schema": {
      "-id": "MPDataSet",
      "-xmlns:xs": "http://www.w3.org/2001/XMLSchema",
      "-xmlns:msdata": "urn:schemas-microsoft-com:xml-msdata",
      "xs:element": {
        "-name": "MPDataSet",
        "-msdata:IsDataSet": "true",
        "-msdata:UseCurrentLocale": "true",
        "xs:complexType": {
          "xs:choice": {
            "-minOccurs": "0",
            "-maxOccurs": "unbounded",
            "xs:element": {
              "-name": "Record",
              "xs:complexType": {
                "xs:sequence": {
                  "xs:element": [
                    {
                      "-name": "address",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "agenda",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "approved",
                      "-type": "xs:boolean",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "app_email",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "app_name",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "app_phone",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "cale_id",
                      "-type": "xs:int",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "canceldate",
                      "-type": "xs:dateTime",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "cancelled",
                      "-type": "xs:boolean",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "cancelnote",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "category",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "city",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "contact",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "custom01",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "custom02",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "custom03",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "custom04",
                      "-type": "xs:decimal",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "custom05",
                      "-type": "xs:decimal",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "custom06",
                      "-type": "xs:decimal",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "custom07",
                      "-type": "xs:dateTime",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "custom08",
                      "-type": "xs:dateTime",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "custom09",
                      "-type": "xs:dateTime",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "custom10",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "custom11",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "custom12",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "custom13",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "custom14",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "custom15",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "datecreate",
                      "-type": "xs:dateTime",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "dateupdate",
                      "-type": "xs:dateTime",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "dept",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "descript",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "enddate",
                      "-type": "xs:dateTime",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "endtime",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "event",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "eventdiv",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "event_img",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "fee",
                      "-type": "xs:boolean",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "function",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "id",
                      "-type": "xs:int",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "import_id",
                      "-type": "xs:int",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "infoemail",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "infoext",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "infofax",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "infophone",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "infourl",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "location",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "loc_hca",
                      "-type": "xs:boolean",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "loc_logo",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "loc_maxatt",
                      "-type": "xs:int",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "loc_park",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "loc_phone",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "loc_room",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "loc_url",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "noexp2web",
                      "-type": "xs:boolean",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "notes",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "onlinereg",
                      "-type": "xs:boolean",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "org_name",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "spk_comp",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "spk_email",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "spk_name",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "spon1logo",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "spon1name",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "spon1url",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "spon2logo",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "spon2name",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "spon2url",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "spon3logo",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "spon3name",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "spon3url",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "spon4logo",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "spon4name",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "spon4url",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "startdate",
                      "-type": "xs:dateTime",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "starttime",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "state",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "subcat",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "topic",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "usercreate",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "userupdate",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "webbrief",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "webmapl",
                      "-type": "xs:int",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "webmapover",
                      "-type": "xs:boolean",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "webremup",
                      "-type": "xs:dateTime",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "webuser_id",
                      "-type": "xs:int",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "zip",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "quickreg",
                      "-type": "xs:boolean",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "app_url",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "spk_url",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "spon1id",
                      "-type": "xs:int",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "spon2id",
                      "-type": "xs:int",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "spon3id",
                      "-type": "xs:int",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "spon4id",
                      "-type": "xs:int",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "catlist",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "mfun_function",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "mfun_funcgrp",
                      "-type": "xs:string",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "webregends",
                      "-type": "xs:dateTime",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "webregmo",
                      "-type": "xs:boolean",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "mfun_id",
                      "-type": "xs:int",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "date_reg2",
                      "-type": "xs:dateTime",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "date_reg3",
                      "-type": "xs:dateTime",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "membcost",
                      "-type": "xs:decimal",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "membcost2",
                      "-type": "xs:decimal",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "membcost3",
                      "-type": "xs:decimal",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "nonmemcost",
                      "-type": "xs:decimal",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "nonmemcst2",
                      "-type": "xs:decimal",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "nonmemcst3",
                      "-type": "xs:decimal",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "webmemdisc",
                      "-type": "xs:decimal",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "webnondisc",
                      "-type": "xs:decimal",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "webgstdisc",
                      "-type": "xs:decimal",
                      "-minOccurs": "0"
                    },
                    {
                      "-name": "webnoeditp",
                      "-type": "xs:boolean",
                      "-minOccurs": "0"
                    }
                  ]
                }
              }
            }
          }
        }
      }
    },
    "diffgr:diffgram": {
      "-xmlns:msdata": "urn:schemas-microsoft-com:xml-msdata",
      "-xmlns:diffgr": "urn:schemas-microsoft-com:xml-diffgram-v1",
      "MPDataSet": {
        "Record": {
          "-diffgr:id": "Record1",
          "-msdata:rowOrder": "0",
          "address": "6808 S. 107th E. Ave.                                       ",
          "approved": "true",
          "app_email": { "-xml:space": "preserve" },
          "app_name": { "-xml:space": "preserve" },
          "app_phone": { "-xml:space": "preserve" },
          "cale_id": "1166",
          "canceldate": "1899-12-30T00:00:00-06:00",
          "cancelled": "false",
          "category": { "-xml:space": "preserve" },
          "city": "Tulsa               ",
          "contact": "Events                                       ",
          "custom01": { "-xml:space": "preserve" },
          "custom02": { "-xml:space": "preserve" },
          "custom03": { "-xml:space": "preserve" },
          "custom04": "0.00",
          "custom05": "0.00",
          "custom06": "0.00",
          "custom07": "1899-12-30T00:00:00-06:00",
          "custom08": "1899-12-30T00:00:00-06:00",
          "custom09": "1899-12-30T00:00:00-06:00",
          "custom10": { "-xml:space": "preserve" },
          "custom11": { "-xml:space": "preserve" },
          "custom12": { "-xml:space": "preserve" },
          "custom13": { "-xml:space": "preserve" },
          "custom14": { "-xml:space": "preserve" },
          "custom15": { "-xml:space": "preserve" },
          "datecreate": "2015-02-03T10:22:18-06:00",
          "dateupdate": "2015-07-24T10:32:59-05:00",
          "dept": { "-xml:space": "preserve" },
          "descript": "<P class=MsoNormal style=\"MARGIN: 0in 0in 0pt\"><B><FONT face=Calibri>OneVoice Regional Legislative Summit<?xml:namespace prefix = \"o\" ns = \"urn:schemas-microsoft-com:office:office\" /><o:p></o:p></FONT></B></P><P class=MsoNormal style=\"MARGIN: 0in 0in 0pt\"><B><o:p><FONT face=Calibri>&nbsp;</FONT></o:p></B></P><P class=MsoNormal style=\"MARGIN: 0in 0in 0pt\"><FONT face=Calibri>Here’s your chance to make an impact on your community through </FONT></P><P class=MsoNormal style=\"MARGIN: 0in 0in 0pt\"><FONT face=Calibri>legislative advocacy. Join the Chamber for the Regional Legislative </FONT></P><P class=MsoNormal style=\"MARGIN: 0in 0in 0pt\"><FONT face=Calibri>Summit, where attendees will decide the 2016 Regional OneVoice agenda. </FONT></P><P class=MsoNormal style=\"MARGIN: 0in 0in 0pt\"><FONT face=Calibri>Groups will prioritize a list of 10 state and 10 federal issues that will make a </FONT></P><P class=MsoNormal style=\"MARGIN: 0in 0in 0pt\"><FONT face=Calibri>difference on Tulsa-area businesses and citizens following presentations and </FONT></P><P class=MsoNormal style=\"MARGIN: 0in 0in 0pt\"><FONT face=Calibri>discussions with staff and peer attendees.<o:p></o:p></FONT></P><P class=MsoNormal style=\"MARGIN: 0in 0in 0pt\"><o:p><FONT face=Calibri>&nbsp;</FONT></o:p></P><P class=MsoNormal style=\"MARGIN: 0in 0in 0pt\"><B><FONT face=Calibri>OneVoice Regional Legislative Summit<o:p></o:p></FONT></B></P><P class=MsoNormal style=\"MARGIN: 0in 0in 0pt\"><B><FONT face=Calibri>Wednesday, September 16</FONT></B></P><P class=MsoNormal style=\"MARGIN: 0in 0in 0pt\"><B><FONT face=Calibri>7:30 a.m. – 12:15 p.m.<o:p></o:p></FONT></B></P><P class=MsoNormal style=\"MARGIN: 0in 0in 0pt\"><B><o:p><FONT face=Calibri>Reniassance Hotel and&nbsp;Convention Center- Tulsa&nbsp;</FONT></o:p></B></P><P><SPAN style=\"FONT-SIZE: 11pt; FONT-FAMILY: 'Calibri','sans-serif'; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA\">Seating is limited. Cost is free for members. </SPAN></P><P><SPAN style=\"FONT-SIZE: 11pt; FONT-FAMILY: 'Calibri','sans-serif'; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA\">Presenting Sponsor</SPAN></P><P><SPAN style=\"FONT-SIZE: 11pt; FONT-FAMILY: 'Calibri','sans-serif'; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA\"><TABLE cellSpacing=1 cellPadding=1 width=\"75%\" border=0><TBODY><TR><TD><SPAN style=\"FONT-SIZE: 11pt; FONT-FAMILY: 'Calibri','sans-serif'; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA\"><IMG style=\"HEIGHT: 37px; WIDTH: 150px\" border=0 hspace=0 alt=\"\" src=\"http://members.tulsachamber.com/sbaweb/images/FTP/GKFFlogo_justified13114.jpg\" width=150 height=38></SPAN><BR><BR><A title=\"\" style=\"TEXT-DECORATION: underline; COLOR: blue\" dataFld=0:0 href=\"http://www.gkff.org/\" target=_self></A><BR><P>Gold Sponsors</P><TABLE cellSpacing=2 cellPadding=2 width=200 border=0><TBODY><TR><TD><IMG style=\"HEIGHT: 70px; WIDTH: 150px\" border=0 hspace=0 alt=\"\" src=\"http://members.tulsachamber.com/sbaweb/images/FTP/OUTSchustermanLogo.jpg\" width=150 height=71>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <IMG style=\"HEIGHT: 59px; WIDTH: 175px\" border=0 hspace=0 alt=\"\" src=\"http://members.tulsachamber.com/sbaweb/images/FTP/SFHS_CMYK.jpg\" width=175 height=60><A href=\"http://www.saintfrancis.com/\"></A></TD><TD><A href=\"http://www.ou.edu/tulsa.html\"></A></TD></TR></TBODY></TABLE><BR>Legislative Benefactors<BR><TABLE cellSpacing=5 cellPadding=5 width=250 border=0><TBODY><TR><TD><A href=\"http://www.att.com\"></A></TD><TD><A href=\"http://www.cox.com\"></A></TD><TD><P><IMG style=\"HEIGHT: 115px; WIDTH: 150px\" border=0 hspace=0 alt=\"\" src=\"http://members.tulsachamber.com/sbaweb/images/FTP/ATThorizontal.jpg\" width=150 height=116><IMG style=\"HEIGHT: 100px; WIDTH: 150px\" border=0 hspace=0 alt=\"\" src=\"http://members.tulsachamber.com/sbaweb/images/FTP/COX_CB_CMYK.jpg\" width=150 height=100></P><P><IMG style=\"HEIGHT: 21px; WIDTH: 150px\" border=0 hspace=0 alt=\"\" src=\"http://members.tulsachamber.com/sbaweb/images/FTP/OklahomaFarmBureaulogo.jpg\" width=150 height=21>&nbsp; &nbsp;&nbsp;&nbsp; <IMG style=\"HEIGHT: 108px; WIDTH: 100px\" border=0 hspace=0 alt=\"\" src=\"http://members.tulsachamber.com/sbaweb/images/FTP/QT_Logo_STACKED.jpg\" width=100 height=108>&nbsp;&nbsp;&nbsp; </P><P><IMG style=\"HEIGHT: 52px; WIDTH: 150px\" border=0 hspace=0 alt=\"\" src=\"http://members.tulsachamber.com/sbaweb/images/FTP/TulsaCommunityCollegeLogo2013.jpg\" width=150 height=53>&nbsp;&nbsp;&nbsp;&nbsp; <IMG style=\"HEIGHT: 49px; WIDTH: 150px\" border=0 hspace=0 alt=\"\" src=\"http://members.tulsachamber.com/sbaweb/images/FTP/TulsaTecheduBC.jpg\" width=150 height=50></P><A href=\"http://www.okfarmbureau.org/\"></A></TD><TD><A href=\"http://www.statefarm.com\"></A></TD><TD><A href=\"http://www.tulsacc.edu/\"></A></TD></TR></TBODY></TABLE></TD></TR></TBODY></TABLE></SPAN></P><P><SPAN style=\"FONT-SIZE: 11pt; FONT-FAMILY: 'Calibri','sans-serif'; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-bidi-font-family: 'Times New Roman'; mso-ansi-language: EN-US; mso-fareast-language: EN-US; mso-bidi-language: AR-SA\"></SPAN>&nbsp;</P>",
          "enddate": "2015-09-16T00:00:00-05:00",
          "endtime": "1215pm  ",
          "event": "OneVoice Regional Legislative Summit 2015                                                           ",
          "eventdiv": "DIV003",
          "event_img": { "-xml:space": "preserve" },
          "fee": "false",
          "function": "1573        ",
          "id": "0",
          "import_id": "1166",
          "infoemail": "events@tulsachamber.com                                                                                                 ",
          "infoext": { "-xml:space": "preserve" },
          "infofax": "9185858016",
          "infophone": "9185600212",
          "infourl": { "-xml:space": "preserve" },
          "location": "Renaissance Tulsa Hotel & Convention Center                 ",
          "loc_hca": "false",
          "loc_logo": { "-xml:space": "preserve" },
          "loc_maxatt": "0",
          "loc_phone": { "-xml:space": "preserve" },
          "loc_room": { "-xml:space": "preserve" },
          "loc_url": { "-xml:space": "preserve" },
          "noexp2web": "false",
          "onlinereg": "true",
          "org_name": { "-xml:space": "preserve" },
          "spk_comp": { "-xml:space": "preserve" },
          "spk_email": { "-xml:space": "preserve" },
          "spk_name": { "-xml:space": "preserve" },
          "spon1logo": { "-xml:space": "preserve" },
          "spon1name": { "-xml:space": "preserve" },
          "spon1url": { "-xml:space": "preserve" },
          "spon2logo": { "-xml:space": "preserve" },
          "spon2name": { "-xml:space": "preserve" },
          "spon2url": { "-xml:space": "preserve" },
          "spon3logo": { "-xml:space": "preserve" },
          "spon3name": { "-xml:space": "preserve" },
          "spon3url": { "-xml:space": "preserve" },
          "spon4logo": { "-xml:space": "preserve" },
          "spon4name": { "-xml:space": "preserve" },
          "spon4url": { "-xml:space": "preserve" },
          "startdate": "2015-09-16T00:00:00-05:00",
          "starttime": "0730am  ",
          "state": "OK",
          "subcat": { "-xml:space": "preserve" },
          "topic": { "-xml:space": "preserve" },
          "usercreate": "LCLARK                        ",
          "userupdate": "LCLARK                        ",
          "webbrief": { "-xml:space": "preserve" },
          "webmapl": "0",
          "webmapover": "false",
          "webremup": "2011-06-08T10:55:37-05:00",
          "webuser_id": "0",
          "zip": "74133     ",
          "quickreg": "false",
          "app_url": { "-xml:space": "preserve" },
          "spk_url": { "-xml:space": "preserve" },
          "spon1id": "0",
          "spon2id": "0",
          "spon3id": "0",
          "spon4id": "0",
          "mfun_function": "1573        ",
          "mfun_funcgrp": { "-xml:space": "preserve" },
          "webregends": "2015-09-16T00:00:00-05:00",
          "webregmo": "false",
          "mfun_id": "2786",
          "date_reg2": "2015-07-24T00:00:00-05:00",
          "date_reg3": "2015-09-15T00:00:00-05:00",
          "membcost": "0.00",
          "membcost2": "0.00",
          "membcost3": "0.00",
          "nonmemcost": "0.00",
          "nonmemcst2": "0.00",
          "nonmemcst3": "0.00",
          "webmemdisc": "0.00",
          "webnondisc": "0.00",
          "webgstdisc": "0.00",
          "webnoeditp": "false"
        }
      }
    }
  }
}