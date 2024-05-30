var objPagination = {
}
$(document).ready(function () {
    GetAll();

})

//por si no llega a funcionar el document.ready
//document.addEventListener("DOMContentLoaded", function (event) {
//    GetAll();
//})
function GetAll() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:5140/api/Cliente/GetAll',
        dataType: 'json',
        success: function (data) {
            var reload = '';
            objPagination["dataSource"] = [...data]
            objPagination["endPagination"] = data.length
            IniciarPaginacionDOM();
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener los datos:', error);
        }
    });
};

function Add() {
    var cliObj = {
        "idCliente": 0,
        "nombre": $('#Nombre').val(),
        "apellidoPaterno": $('#ApellidoPaterno').val(),
        "apellidoMaterno": $('#ApellidoMaterno').val(),
        "email": $('#Email').val(),
        "telefono": $('#Telefono').val(),
        "fecha_Registro": $('#FechaRegistro').val(),
        "sucursal": {
            "idSucursal": parseInt($("#IdSucursal").val()),
            "nombre": "",
            "sucursales": [
                null
            ]
        },
        "clientes": [
            null
        ]
    };
    $.ajax({
        url: "http://localhost:5140/api/Cliente/Add",
        data: JSON.stringify(cliObj),
        type: "POST",
        contentType: "application/json",
        dataType: "JSON",
        success: function (result) {
            console.log("Cliente agregado exitosamente.");
            GetAll();
            $('#closeModal').click();
        },
        error: function (errormessage) {
            console.log("No agregado" + errormessage);
            alert(errormessage.responseText);
        }
    });
}


function Update() {
    var cliObj = {
        "idCliente": ($('#IdCliente').val()),
        "nombre": $('#Nombre').val(),
        "apellidoPaterno": $('#ApellidoPaterno').val(),
        "apellidoMaterno": $('#ApellidoMaterno').val(),
        "email": $('#Email').val(),
        "telefono": $('#Telefono').val(),
        "fecha_Registro": $('#FechaRegistro').val(),
        "sucursal": {
            "idSucursal": parseInt($("#IdSucursal").val()),
            "nombre": "",
            "sucursales": [
                null
            ]
        },
        "clientes": [
            null
        ]
    };
    $.ajax({
        url: "http://localhost:5140/api/Cliente/Update",
        data: JSON.stringify(cliObj),
        type: "PUT",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            GetAll();
            $('#myModal').modal('toggle'); // Modificado aquí
            $('#IdCliente').val("");
            $('#Nombre').val("");
            $('#ApellidoPaterno').val("");
            $('#ApellidoMaterno').val("");
            $('#Email').val("");
            $('#Telefono').val("");
            $('#FechaRegistro').val("");
            $('#IdSucursal').val("");
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}



function Delete(IdCliente) {
    var borrar = confirm("Seguro que deseas borrarlo");
    if (borrar) {
        $.ajax({
            url: "http://localhost:5140/api/Cliente/Delete?IdCliente=" + IdCliente,
            type: "DELETE",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                GetAll();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function getbyID(idCliente) {
    $('#Nombre').css('border-color', 'lightgrey');
    $('#ApellidoPaterno').css('border-color', 'lightgrey');
    $('#ApellidoMaterno').css('border-color', 'lightgrey');
    $('#Email').css('border-color', 'lightgrey');
    $('#Telefono').css('border-color', 'lightgrey');
    $('#FechaRegistro').css('border-color', 'lightgrey');
    $('#IdSucursal').css('border-color', 'lightgrey');
    $.ajax({
        url: "http://localhost:5140/api/Cliente/GetById?IdCliente=" + idCliente,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#IdCliente').val(result.idCliente);
            $('#Nombre').val(result.nombre);
            $('#ApellidoPaterno').val(result.apellidoPaterno);
            $('#ApellidoMaterno').val(result.apellidoMaterno);
            $('#Email').val(result.email);
            $('#Telefono').val(result.telefono);
            $('#FechaRegistro').val(result.fecha_Registro);
            $('#IdSucursal').val(result.sucursal.idSucursal)

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}
//Por si no llega a funcionar el document.ready
//document.addEventListener("DOMContentLoaded", function (event) {
//    $.ajax({
//        type: "GET",
//        url: "",
//        data: "{}",
//        success: function (data) {
//            var s = '<option value="-1">Selecciona una surcusal</option>';
//            for (var i = 0; i < data.length; i++) {
//                s += '<option value="' + data[i].IdSucursal + '">' + data[i].Nombre + '</option>';
//            }
//            $("#IdSurcursal").html(s);
//        }
//    })
//}) 
function clearTextBox() {
    $('#IdCliente').val("");
    $('#Nombre').val("");
    $('#ApellidoPaterno').val("");
    $('#ApellidoMaterno').val("");
    $('#Email').val("");
    $('#Telefono').val("");
    $('#FechaRegistro').val("");
    $('#IdSucursal').val("")
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Nombre').css('border-color', 'lightgrey');
    $('#ApellidoPaterno').css('border-color', 'lightgrey');
    $('#ApellidoMaterno').css('border-color', 'lightgrey');
    $('#Email').css('border-color', 'lightgrey');
    $('#Telefono').css('border-color', 'lightgrey');
    $('#FechaRegistro').css('border-color', 'lightgrey');
    $('#IdSurcursal').css('border-color', 'lightgrey');
}


function Cerrar() {
    $('#btnClose').click();
}

function listItem(event) {
    objPagination["currentPage"] = parseInt(event.target.text)
    let getList = $(event.currentTarget)
    let actualList = $(event.target).closest('li')
    getList.find('li').removeClass('active')
    actualList.addClass('active')
    OperationPage();
}

function IniciarPaginacion(event) {
    let init = $(event.target).prop("selectedIndex")
    if (init > 0) {
        objPagination["showPagination"] = parseInt($(event.target).prop('options')[init].outerText)
        objPagination["currentPage"] = parseInt($('#currentPage > li.active').text())
        OperationPage();
    }
}

function IniciarPaginacionDOM() {
    debugger
    objPagination["showPagination"] = 5
    OperationPageDOM();
}


function OperationPageDOM() {
    if ($('#pagination').children('ul').length === 0) {
        $('#pagination').append(
            $('<ul>').prop('id', 'currentPage').addClass('pagination pagination-sm').append([
                $('<li>').addClass('page-item disabled').append(
                    $('<a>').addClass('page-link').text('Previous')
                ),
                $('<li>').addClass('page-item').append(
                    $('<a>').addClass('page-link').text('Next')
                )
            ])
        )
        let showStart = 0 * objPagination['showPagination']
        let showEnd = showStart + objPagination['showPagination']
        if (showStart > objPagination['dataSource'].length) {
            showStart = objPagination['dataSource'].length
        }
        if (showEnd > objPagination['dataSource'].length) {
            showEnd = objPagination['dataSource'].length;
        }
        $('#target').text(`Contenido de ${showStart} de ${showEnd}`)
        objPagination["currentPageData"] = objPagination["dataSource"].slice(showStart, showEnd)
        $('#tabla-cliente tbody').empty();
        $.each(objPagination["currentPageData"], (index, value) => {
            let row = $('<tr>')
            row.append($('<td>').append(value.nombre))
            row.append($('<td>').append(value.apellidoPaterno))
            row.append($('<td>').append(value.apellidoMaterno))
            row.append($('<td>').append(value.email))
            row.append($('<td>').append(value.telefono))
            row.append($('<td>').append(new Date(value.fecha_Registro).toLocaleDateString('es-MX')))
            row.append($('<td>').append(value.sucursal.nombre))
            let div = $('<div>')
            div.addClass('d-flex gap-1')
                .append($(`<a href='#' onclick='return getbyID(${value.idCliente})'>`).addClass('btn btn-warning btn-sm').text('Editar'))
                .append($(`<a href='#' onclick='return Delete(${value.idCliente})'>`).addClass('btn btn-danger btn-sm').text('Eliminar'))
            row.append($('<td>').append(div))
            $('#tabla-cliente tbody').append(row)
        })
        let pagination = Math.ceil(objPagination["endPagination"] / objPagination["currentPageData"].length)
        for (let i = 1; i <= pagination; i++) {
            $('#currentPage > li').next().before().append(
                $('<li>').addClass('page-item').append(
                    $('<a>').addClass('page-link').text(i)
                )
            )
        }
        $('#currentPage').on('click', listItem)
    }
}

function OperationPage() {
    let showStart = 0 * objPagination['showPagination']
    let showEnd = showStart + objPagination['showPagination']
    if (showStart > objPagination['dataSource'].length) {
        showStart = objPagination['dataSource'].length
    }
    if (showEnd > objPagination['dataSource'].length) {
        showEnd = objPagination['dataSource'].length;
    }
    $('#target').text(`Contenido de ${showStart} de ${showEnd}`)
    $('#tabla-cliente tbody').empty();
    objPagination["currentPageData"] = objPagination["dataSource"].slice(showStart, showEnd)
    $.each(objPagination["currentPageData"], (index, value) => {
        let row = $('<tr>')
        row.append($('<td>').append(value.nombre))
        row.append($('<td>').append(value.apellidoPaterno))
        row.append($('<td>').append(value.apellidoMaterno))
        row.append($('<td>').append(value.email))
        row.append($('<td>').append(value.telefono))
        row.append($('<td>').append(new Date(value.fecha_Registro).toLocaleDateString('es-MX')))
        row.append($('<td>').append(value.sucursal.nombre))
        let div = $('<div>')
        div.addClass('d-flex gap-1')
            .append($(`<a href='#' onclick='return getbyID(${value.idCliente})'>`).addClass('btn btn-warning btn-sm').text('Editar'))
            .append($(`<a href='#' onclick='return Delete(${value.idCliente})'>`).addClass('btn btn-danger btn-sm').text('Eliminar'))
        row.append($('<td>').append(div))
        $('#tabla-cliente tbody').append(row)
    })
    let pagination = Math.ceil(objPagination["endPagination"] / objPagination["currentPageData"].length)
    for (let i = 1; i <= pagination; i++) {
        $('#currentPage > li').next().before().append(
            $('<li>').addClass('page-item').text(i)
        )
    }
}

$('#PSelect').on('change', IniciarPaginacion)
