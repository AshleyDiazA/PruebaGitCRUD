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
        url: '',
        dataType: 'JSON',
        success: function (data) {
            var reload = '';
            $.each(data, function (GetAll, Cliente) {
                reload += '<tr>';
                reload += '<td>' + Cliente.Nombre + '</td>';
                reload += '<td>' + Cliente.ApellidoPaterno + '</td>';
                reload += '<td>' + Cliente.ApellidoMaterno + '</td>';
                reload += '<td>' + Cliente.Email + '</td>';
                reload += '<td>' + Cliente.Telefono + '</td>';
                reload += '<td>' + Cliente.Sucusal.Nombre + '</td>';
                reload += '<td><a class="btn btn-warning" href="#" onclick="return getbyID(' + Cliente.IdCliente + ')">Editar</a> | <a class="btn btn-danger" href="#" onclick="Delele(' + Empleado.IdCliente + ')">Borrar</a></td>';
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

    };
    $.ajax({
        url: "",
        data: JSON.stringify(cliObj),
        type: "POST",
        contentType: "application/json",
        dataType: "JSON",
        success: function (result) {
            console.log("Cliente agregado exitosamente.");
            GetAll();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            console.log("No agregado" + errormessage);
            alert(errormessage.responseText);
        }
    });
}

function Update() {
    var cliObj = {

    };
    $.ajax({
        url: "",
        data: JSON.stringify(cliObj),
        type: "PUT",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            GetAll();
            $('#myModal').modal('hide');
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
            url: "" + IdCliente,
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

function getbyID(IdCliente) {
    $('#Nombre').css('border-color', 'lightgrey');
    $('#ApellidoPaterno').css('border-color', 'lightgrey');
    $('#ApellidoMaterno').css('border-color', 'lightgrey');
    $('#Email').css('border-color', 'lightgrey');
    $('#Telefono').css('border-color', 'lightgrey');
    $('#FechaRegistro').css('border-color', 'lightgrey');
    $('#IdSucursal').css('border-color', 'lightgrey');
    $.ajax({
        url: "" + IdCliente,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#IdCliente').val(result.IdCliente);
            $('#Nombre').val(result.Nombre);
            $('#ApellidoPaterno').val(result.ApellidoPaterno);
            $('#ApellidoMaterno').val(result.ApellidoMaterno);
            $('#Email').val(result.Email);
            $('#Telefono').val(result.Email);
            $('#FechaRegistro').val(result.Email);
            $('#IdSucursal').val(result.Surcusal.IdSurcursal)

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
        url: "",
        data: "{}",
        success: function (data) {
            var s = '<option value="-1">Selecciona una sucursal</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option value="' + data[i].IdSucursal + '">' + data[i].Nombre + '</option>';
            }
            $("#IdSurcursal").html(s);
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