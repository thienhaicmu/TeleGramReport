﻿$(document).ready(function () {
    Init.InitControl();
    SetDataSource.Load();


});



var Init = {
    InitColums: {
        TH:
            [{
                field: "groupName",
                title: "Nhóm",

                template: (dataItem) => {
                    var groupid = dataItem.GroupID;
                    var date = `"${SetDataSource.FormatDate($("#date").data("kendoDatePicker").value())}"`;
                    return `<h6 class='click' onClick='SetDataSource.LoadDetail.CT(${groupid},${date}) '>${dataItem.groupName}</h6>`
                }
            }, {
                field: "value",
                title: "Điểm",
                type: "int",
                template: (dataItem) => {
                    var groupid = dataItem.GroupID;
                    var date = `"${SetDataSource.FormatDate($("#date").data("kendoDatePicker").value())}"`;
                    return `<h6 class='click' onClick='SetDataSource.LoadDetail.CT(${groupid},${date})'>${kendo.toString(dataItem.value, "##,#")}</h6>`
                }
            }, {
                field: "HH",
                title: "Hoa Hồng",
                template: (dataItem) => {
                    return `<h6>${kendo.toString(dataItem.HH, "##,#")}</h6>`
                }
            }, {
                field: "Amount",
                title: "Trúng",
                template: (dataItem) => {
                    return `<h6>${kendo.toString(dataItem.Amount, "##,#")}</h6>`
                }

            }, {
                field: "Earn",
                title: "Thắng/Thua",
                type: "int",
                template: (dataItem) => {
                    if (dataItem.Earn > 0)
                        return `<h6 class='ok'>${kendo.toString(dataItem.Earn, "##,#")}</h6>`;
                    return `<h6 class='notok'>${kendo.toString(dataItem.Earn, "##,#")}</h6>`;
                }
            },
            {
                field: "CreatedDate",
                title: "Ngày",
                type: "date",
                format: "{0: dd-MM-yyyy hh:mm:ss}"
            }],
        CT:
            [{
                field: "GroupName",
                title: "Nhóm",
                template: (dataItem) => {
                    var groupid = dataItem.GroupID;
                    var type = `"${dataItem.Type}"`;
                    var date = `"${SetDataSource.FormatDate($("#date").data("kendoDatePicker").value())}"`;
                    return `<h6 class='click' onClick='SetDataSource.LoadDetail.CT1(${groupid},${type},${date}) '>${dataItem.GroupName}</h6>`
                }
            }, {
                field: "Type",
                title: "Kiểu chơi",
                template: (dataItem) => {
                    var groupid = dataItem.GroupID;
                    var type = `"${dataItem.Type}"`;
                    var date = `"${SetDataSource.FormatDate($("#date").data("kendoDatePicker").value())}"`;
                    return `<h6 class='click' onClick='SetDataSource.LoadDetail.CT1(${groupid},${type},${date}) '>${dataItem.Type}</h6>`
                }
            }, {
                field: "value",
                title: "Điểm",
                template: (dataItem) => {
                    var groupid = dataItem.GroupID;
                    var type = `"${dataItem.Type}"`;
                    var date = `"${SetDataSource.FormatDate($("#date").data("kendoDatePicker").value())}"`;
                    return `<h6 class='click' onClick='SetDataSource.LoadDetail.CT1(${groupid},${type},${date}) '>${kendo.toString(dataItem.value, "##,#")}</h6>`
                }
            }, {
                field: "HH",
                title: "Hoa Hồng",
                template: (dataItem) => {
                    return `<h6>${kendo.toString(dataItem.HH, "##,#")}</h6>`
                }
            },{
                field: "Amount",
                title: "Trúng",
                template: (dataItem) => {
                    return `<h6>${kendo.toString(dataItem.Amount, "##,#")}</h6>`
                }

            }, {
                field: "Earn",
                title: "Thắng/Thua",
                template: (dataItem) => {
                    if (dataItem.Earn > 0)
                        return `<h6 class='ok'>${kendo.toString(dataItem.Earn, "##,#")}</h6>`;
                    return `<h6 class='notok'>${kendo.toString(dataItem.Earn, "##,#")}</h6>`;
                }
            },
            {
                field: "CreatedDate",
                title: "Ngày",
                type: "date",
                format: "{0: dd-MM-yyyy hh:mm:ss}"
            }],
        CT1:
            [{
                field: "Num",
                title: "Số",
                template: (dataItem) => {
                    ck = dataItem.ck;
                    if (ck != -1)
                        return `<span class='ck'>${dataItem.Num}</span>`
                    return `<span class='noneck'>${dataItem.Num}</span>`
                }

            }, {
                field: "Value",
                title: "Điểm"

            }, {
                field: "HH",
                title: "Hoa Hồng"
            }, {
                field: "Amount",
                title: "Trúng",
                template: (dataItem) => {
                    return `<h6>${kendo.toString(dataItem.Amount, "##,#")}</h6>`
                }
            }, {
                field: "Earn",
                title: "Thắng/Thua",
                template: (dataItem) => {
                    if (dataItem.Earn > 0)
                        return `<h6 class='ok'>${kendo.toString(dataItem.Earn, "##,#")}</h6>`;
                    return `<h6 class='notok'>${kendo.toString(dataItem.Earn, "##,#")}</h6>`;
                }
            },
            {
                field: "CreatedDate",
                title: "Ngày",
                type: "date",
                format: "{0: dd-MM-yyyy hh:mm:ss}"
            }],

    },

    InitGrid: function (element, columns) {
        element.kendoGrid({
            sortable: true,
            resizable: true,
            reorderable: true,
            pageable: {
                refresh: true,
                buttonCount: 5,
                pageSize: 100,
                messages: {
                    itemsPerPage: "dòng / trang",
                    display: "Hiển thị {0} - {1} / {2}",
                    empty: "Không tìm thấy dữ liệu",
                },
            },
            //toolbar: kendo.template($("#headersave").html()),
            columns: columns

        });
    },
    InitControl: function () {
        $("#tabstrip").kendoTabStrip({
            animation: {
                open: {
                    effects: "fadeIn",
                },
            },
        });
        var coll = document.getElementsByClassName("collapsible");
        var i;

        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                    content.style.opacity = 0;
                    content.style.height = "0";
                } else {
                    content.style.display = "block";
                    content.style.opacity = 1;
                    content.style.height = "auto";
                    content.style.animation = "fade-in 800ms 1";
                }
            });
        }

        $("#groupid").kendoDropDownList({
            dataTextField: "GroupName",
            dataValueField: "GroupID",
            dataSource: new kendo.data.DataSource({
                transport: {
                    read: function (options) {
                        $.ajax({
                            url: '/Home/Getfilter',
                            async: false,
                            type: 'get',
                            success: function (result) {
                                var AddValue = [{ GroupID: 0, GroupName: "Tất cả" }];
                                if (!result) {
                                    options.success(AddValue);
                                } else {
                                    result.unshift(AddValue[0])
                                    options.success(result);
                                    $("#groupid").data("kendoDropDownList").select(0);

                                }
                            }, error: function (err) {
                                console.log(err);
                            }
                        });
                    }
                }
            })
        });

        var date = new Date();
        $("#date").kendoDatePicker({
            format: "dd/MM/yyyy",
            value: date,
            open: function () {
                var calendar = this.dateView.calendar;
                calendar.wrapper.width(this.wrapper.width() + 2);
            }
        });

        this.InitGrid($("#grid"), this.InitColums.TH);
        this.InitGrid($("#griddetail"), this.InitColums.CT);
        this.InitGrid($("#griddetail1"), this.InitColums.CT1);

    }

}
var SetDataSource = {
    CallAjx: (url, param, type, elementgrid, tab) => {
        $.ajax({
            url: url,
            data: param,
            async: true,
            type: type,
            success: function (result) {
                var grid = elementgrid.data("kendoGrid");
                var options = grid.options;
                options.dataSource = result;
                elementgrid.empty().kendoGrid(options);
                elementgrid.data("kendoGrid").refresh();
                $(".load").css("display", "inline");
                $(".spinner-border").css("display", "none");
                SetDataSource.ChangeTab(tab)
            },
            error: function (err) {
                console.log(err)
                $(".load").css("display", "inline");
                $(".spinner-border").css("display", "none");

            },
        })


    },
    ChangeTab: (tab) => { $("#tabstrip").data("kendoTabStrip").select(tab) },
    Load: () => {
        $(".load").click(function () {
            $(".load").css("display", "none");
            $(".spinner-border").css("display", "inline");

            SetDataSource.CallAjx("/Home/GetTH", { gr: $("#groupid").data('kendoDropDownList').value(), Date: SetDataSource.FormatDate($("#date").data("kendoDatePicker").value()) }, "GET", $('#grid'), 0)

        });
    },

    LoadDetail: {
        CT: (groupID, date) => { SetDataSource.CallAjx("/Home/GetCT", { gr: groupID, Date: date }, "GET", $('#griddetail'), 1) },
        CT1: (groupID, type, date) => { SetDataSource.CallAjx("/Home/GetCT1", { gr: groupID, type: type, date: date }, "GET", $('#griddetail1'), 2) }
    },
    FormatDate: (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
}

