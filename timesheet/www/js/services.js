angular.module('starter.services', [])

    // Get saved data from sessionStorage


.factory('TimeSheetListService',function($http,$q){
  var service = {};
  service.registerUser = function(){
       var _userData = JSON.parse(sessionStorage.getItem('userData'));
    return  $http({
        method  : 'GET',
       // url     : 'http://119.226.216.141/EnterpriseServices/TimesheetService/TimeSheetService.svc/Enterprise/TimeSheet/PendingApproval/60228',
       // url: 'http://119.226.216.141/EnterpriseServices/TimesheetService/TimesheetService.svc/Enterprise/TimeSheet/PendingApproval?',
       ///data    : "EmployeeId="+60228+"&PageSize="+20+"&PageIndex="+1,  // pass in data as strings
        url: 'http://119.226.216.141/EnterpriseServices/TimesheetService/TimesheetService.svc/Enterprise/TimeSheet/PendingApproval?EmployeeId=' + _userData.EmployeeNumber + '&PageSize=100&PageIndex=1',
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
     })  
  }


  return service;
})
.factory('TimeSheetListApproveService',function($http,$q){
  var service = {};
  service.approve = function(timesheetId){
     //alert(timesheetId);
    return  $http({
        method  : 'POST',      
        url: 'http://119.226.216.141/EnterpriseServices/TimesheetService/TimeSheetService.svc/Enterprise/TimeSheet/ApproveTimesheet/'+timesheetId,
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
     })  
  }
  return service;
})
.factory('TimeSheetListRejectService',function($http,$q){
  var service = {};
  service.reject = function(timesheetId){
     
    return  $http({
        method  : 'POST',      
        url: 'http://119.226.216.141/EnterpriseServices/TimesheetService/TimeSheetService.svc/Enterprise/TimeSheet/RejectTimesheet/'+timesheetId,
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
     })  
  }
  return service;
})
.factory('LoginService',function($http,$q){
  var service = {};
  service.logIn = function(username, pwd){
    var authStr = 'domain=trianz||||username=' + username+ '||||password='+pwd+'';
    var encodedData = window.btoa(authStr);     
    return  $http({
        method  : 'GET',      
        url: 'http://119.226.216.141/EnterpriseServices/SecurityService/AuthenticationService.svc/Enterprise/Security/User/Authenticate?auth='+encodedData,
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
     })  
  }
  return service;
})

.factory('RoleService',function($http,$q){
  var service = {};
  service.getRole = function(){

       var _userData = JSON.parse(sessionStorage.getItem('userData'));



    return  $http({
        method  : 'GET',      
        url: 'http://172.16.0.217/EnterpriseServices/HRRFService/HRRFService.svc/Enterprise/HRRF/Role?EmployeeId=' + _userData.EmployeeNumber,
        //url: 'http://172.16.0.217/EnterpriseServices/HRRFService/HRRFService.svc/Enterprise/HRRF/Role?EmployeeId=60228',
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
     })  
  }
  return service;
})


.factory('LoaderService',function($ionicLoading){
  var service = {};
  service.show = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="bubbles" class="spinner-balanced"></ion-spinner>'
    });
  };

  service.hide = function(){
    $ionicLoading.hide();
  };
  return service;
})



// Skills Approval 

.factory('EmployeeSkillsService',function($http,$q){
  var service = {};
  service.sharedEmpId = {};
 service.getEmployeeSkills = function(){
       var _userData = JSON.parse(sessionStorage.getItem('userData'));
    return  $http({
        method  : 'GET',
        url: 'http://119.226.216.141/EnterpriseServices/HRRFService/HRRFService.svc/Enterprise/HRRF/Skills/ManagerApprovalList?EmployeeId=' + _userData.EmployeeNumber + '&PageSize=100&PageIndex=1',
        //url: 'http://119.226.216.141/EnterpriseServices/TimesheetService/TimesheetService.svc/Enterprise/TimeSheet/PendingApproval?EmployeeId=' + _userData.EmployeeNumber + '&PageSize=100&PageIndex=1',
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
     })  
  }

  service.setEmpId = function (value){
    service.sharedEmpId = value;

  }
  service.getEmpId = function (value){
    return service.sharedEmpId;
  }
  return service;
})

.factory('skillDetailsServices',function($http,$q){
  var service = {};
  service.skillDetails = function(){
  var empId = sessionStorage.getItem('empId');
  //empId = _empId;
          return  $http({
        method  : 'GET',
       // url: 'http://172.16.0.217/EnterpriseServices/HRRFService/HRRFService.svc/Enterprise/HRRF/Skills/ManagerApprovalList?EmployeeId=' + _userData.EmployeeNumber + '&PageSize=100&PageIndex=1',
        
        url:'http://119.226.216.141/EnterpriseServices/HRRFService/HRRFService.svc/Enterprise/HRRF/Skills/EmployeeSkillsList?EmployeeId='+empId+'&PageSize=10&PageIndex=1',
        //url: 'http://119.226.216.141/EnterpriseServices/TimesheetService/TimesheetService.svc/Enterprise/TimeSheet/PendingApproval?EmployeeId=' + _userData.EmployeeNumber + '&PageSize=100&PageIndex=1',
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
     })  
  }
  return service;
})


.factory('SkillApproveServices',function($http,$q){
  var service = {};
  service.approveSkills = function(_skillIds){
    _skillIds = _skillIds.join();
  var empId = sessionStorage.getItem('empId');
          return  $http({
        method  : 'POST',
        url : 'http://172.16.0.217/EnterpriseServices/HRRFService/HRRFService.svc/Enterprise/HRRF/Skills/Accept?SkillsID='+_skillIds+'&EmployeeId='+empId,
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
     })  
  }
  return service;
})

.factory('SkillRejectionServices',function($http,$q){
  var service = {};
  service.rejectSkills = function(_skillIds, remark){
    _skillIds = _skillIds.join();
  var empId = sessionStorage.getItem('empId');
          return  $http({
        method  : 'POST',
        url:'http://172.16.0.217/EnterpriseServices/HRRFService/HRRFService.svc/Enterprise/HRRF/Skills/Reject?SkillsID='+_skillIds+'&EmployeeId='+empId+'&Remarks='+remark+'',
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
     })  
  }
  return service;
})






//TR's

.factory('HRRFApprovalService',function($http,$q){
  var service = {};
 service.getTR = function(){
       var _userData = JSON.parse(sessionStorage.getItem('userData'));
    return  $http({
        method  : 'GET',
        url : 'http://172.16.0.217/EnterpriseServices/HRRFService/HRRFService.svc/Enterprise/HRRF/Approvals?EmployeeId=' + _userData.EmployeeNumber + '&PageSize=100&PageIndex=1',
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
     })  
  }
  return service;
})

.factory('HRRFAcceptService',function($http,$q){
  var service = {};
 service.acceptHRRF = function(HRRFNo){
       var _userData = JSON.parse(sessionStorage.getItem('userData'));
    return  $http({
        method  : 'POST',
        url : 'http://172.16.0.217/EnterpriseServices/HRRFService/HRRFService.svc/Enterprise/HRRF/ExternalFulfilment/Accept?HRRFNumber='+HRRFNo+'&EmployeeId='+_userData.EmployeeNumber,
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
     })  
  }
  return service;
})


.factory('HRRFRejectService',function($http,$q){
  var service = {};
 service.rejectHRRF = function(HRRFNo, remark){
       var _userData = JSON.parse(sessionStorage.getItem('userData'));
    return  $http({
        method  : 'POST',
        url : 'http://172.16.0.217/EnterpriseServices/HRRFService/HRRFService.svc/Enterprise/HRRF/ExternalFulfilment/Reject?HRRFNumber='+HRRFNo+'&EmployeeId='+_userData.EmployeeNumber + '&Remarks='+remark+'',
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
     })  
  }
  return service;
});














