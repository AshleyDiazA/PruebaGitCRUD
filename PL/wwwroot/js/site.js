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
            $.each(data, (GetAll, Cliente) => {
                reload += '<tr>';
                reload += '<td>' + Cliente.nombre + '</td>';
                reload += '<td>' + Cliente.apellidoPaterno + '</td>';
                reload += '<td>' + Cliente.apellidoMaterno + '</td>';
                reload += '<td>' + Cliente.email + '</td>';
                reload += '<td>' + Cliente.telefono + '</td>';
                reload += '<td>' + new Date(Cliente.fecha_Registro).toLocaleDateString('es-MX') + '</td>';
                reload += '<td>' + Cliente.sucursal.nombre + '</td>';
                reload += `<td><div class='d-flex gap-1'><a class='btn btn-sm btn-warning' href='#' onclick='return getbyID(${Cliente.idCliente})'>Editar</a><a class='btn btn-sm btn-danger' href='#' onclick=Delete(${Cliente.idCliente})>Borrar</a></div></td>`;
                reload += '</tr>';
            });
            $('#tabla-cliente tbody').html(reload);
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
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "http://localhost:5140/api/Cliente/GetAllSucursal",
        data: "{}",
        success: function (data) {
            var s = '<option value="-1">Selecciona una sucursal</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option value="' + data[i].idSucursal + '">' + data[i].nombre + '</option>';
            }
            $("#IdSucursal").html(s);
        }
    });
});

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

