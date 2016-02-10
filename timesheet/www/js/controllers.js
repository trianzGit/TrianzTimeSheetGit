angular.module('starter.controllers', [])

/*.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    alert("dcv");
    $scope.modal.show();
  };

  //Log out
  $scope.LogOut = function() {
    alert('hi');
    //$state.go('app.login');
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})*/

.controller('PlaylistsCtrl', function($scope, TimeSheetListService, TimeSheetListApproveService, TimeSheetListRejectService, LoaderService, $ionicPopup, $state) {
 /* $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];*/

  $scope.doRefresh = function () {
    $state.go($state.current, {}, {reload: true});
  };
  $scope.tsList = {};
  $scope.emptyMessage="";
  LoaderService.show();

    TimeSheetListService.registerUser().success(function(data) {

      $scope.tsList = data;
	  if($scope.tsList && $scope.tsList.length==0)
	  {
		  $scope.emptyMessage="No records available";
     // $('.emptyMsg').addClass('margin-top');
      document.getElementById('emptyMsg').className += ' margin-top display-block';
       LoaderService.hide();
	  }
	  else
	  {
			  for (var i=0; i<$scope.tsList.length; i++){

			  var str = $scope.tsList[i].FromDate, str1 = $scope.tsList[i].ToDate;
			  var res = str.substring(6, 24), res1 = str1.substring(6, 24);;
			  //console.log(res);

			  $scope.tsList[i].fromDateStr = new Date(parseInt(res));
			  $scope.tsList[i].toDateStr = new Date(parseInt(res1));
			  //someStr.replace(/['"]+/g, '')
			  //new Date(res);            
			  }
        LoaderService.hide();
			  $state.go('app.playlists');
			  }

      }).error(function(data) {
          LoaderService.hide();
          var alertPopup = $ionicPopup.alert({
              title: 'Network Error',
              template: data.error
          });
           LoaderService.hide();
      });

      //Accordion helpers
       /*
       * if given group is the selected group, deselect it
       * else, select the given group
       */
      $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
          $scope.shownGroup = null;
        } else {
          $scope.shownGroup = group;
        }
      };
      $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
      };



      //alert(timesheetId);
       $scope.approveTimesheet = function(timesheetId) {
        var timesheetId = timesheetId;
        var confirmPopup = $ionicPopup.confirm({
         title: 'Approve Timesheet',
         template: 'Are you sure you want to approve this timesheet?'
       });
       confirmPopup.then(function(res) {
        LoaderService.show();

         if(res) {
          //Approve the timesheet
          TimeSheetListApproveService.approve(timesheetId).success(function(data) {
            $scope.result = data;
            LoaderService.hide();      
            console.log("Reload");
            $state.go($state.current, {}, {reload: true});

          }).error(function(data) {
              var alertPopup = $ionicPopup.alert({
                  title: 'Network Error',
                  template: data.error
              });
              LoaderService.hide();
          });
          // console.log('You are sure');
         } else {
           LoaderService.hide();
           console.log('You are not sure');
         }
       });
     };
    $scope.rejectTimesheet = function(timesheetId) {
      var confirmPopup = $ionicPopup.confirm({
       title: 'Reject Timesheet',
       template: 'Are you sure you want to reject this timesheet?'
      });
      confirmPopup.then(function(res) {
        LoaderService.show();

       if(res) {
        //Approve the timesheet
        TimeSheetListRejectService.reject(timesheetId).success(function(data) {
        $scope.result = data;
        LoaderService.hide();

        
         $state.go($state.current, {}, {reload: true});

        }).error(function(data) {
            LoaderService.hide();
            var alertPopup = $ionicPopup.alert({
                title: 'Network Error',
                template: data.error
            });
        });
       } else {
         LoaderService.hide();
         console.log('You are not sure');
       }
      });
    };
    
})

.controller('PlaylistCtrl', function($scope, $stateParams) {



})

.controller('DashboardCtrl', function($scope, $stateParams, $state, RoleService, LoaderService) {
 
  LoaderService.show();
      $scope.logoutFromDashBoard = function(){
        sessionStorage.clear();
        $state.go('login');
      }
      $scope.loadEmployeeSkills = function () {
        $state.go('app.employeeSkills');
      }
       $scope.loadTimesheet = function() {
        $state.go('app.playlists');
      }
      $scope.loadHRRFApprovals = function () {
        $state.go('app.TRapprovals');
      }

      //var roleObtained = RoleService.getRole();
      //console.log(roleObtained);
  RoleService.getRole().success(function(data) {

    var responseData = data;
    $scope.timesheet = false;
    $scope.skills = false;
    $scope.tr = false;
    if(responseData.GetRoleAndPracticeResult == [] || responseData.GetRoleAndPracticeResult.length <= 0)
      {
            LoaderService.hide();
            $scope.emptyMessage="No information available for employees";
            document.getElementById('emptyMsgDashboard').className += ' margin-topDashboard display-block';
        
      }
    
      else
      {
          LoaderService.hide();
          var roleRegistered = (responseData.GetRoleAndPracticeResult[0].Role).toUpperCase();
          
         switch(roleRegistered)
          {

            case "OM" : $scope.timesheet = true;
                        $scope.skills = true;
                        break;
            case "PM" : $scope.timesheet = true;
                        $scope.skills = true;
                        break;
            case "ADMIN" : $scope.timesheet = true;
                           $scope.skills = true;
                           break;
                     
            case "PH" :
                          $scope.timesheet = true;
                          $scope.skills = true;
                          $scope.tr = true; 
                      break;

            default : console.log("no role");

          }

      }

  }).error(function(data) { 
     LoaderService.hide();
 });    

})

.controller('LoginCtrl', function($scope, LoginService, LoaderService, $ionicPopup, $state, $ionicSideMenuDelegate) {
  LoaderService.hide();
  sessionStorage.clear();

  $scope.LogIn = function(username, pwd) {
    $scope.pwd =pwd;
    $scope.username = username;

    
     // $scope.userForm.$setPristine(); //Set form to pristine mode


    //if (angular.isDefined( $scope.username) && angular.isDefined( $scope.pwd)) { 
    if ($scope.pwd != null && $scope.username != null && $scope.pwd != undefined && $scope.username != undefined) {

        LoaderService.show();
        LoginService.logIn(username, pwd).success(function(data) {
          console.log(data);
          //$state.go('app.playlists');
          if (data.EmployeeNumber && data.EmployeeNumber != '' && data.EmployeeNumber != 0 && data.EmployeeNumber!="0") {
            var userData = {};
            userData.EmployeeNumber = data.EmployeeNumber;
            userData.UserEmail = data.UserEmail;
            userData.UserFullName = data.UserFullName;
                sessionStorage.setItem('userData', JSON.stringify(userData));
                $scope.username = null;
                $scope.pwd = null;
                LoaderService.hide();
              //$state.go('app.playlists');
              //$ionicSideMenuDelegate.canDragContent(false)
              $state.go('dashboard');
          }
          if(data.ErrorMessage != '' && data.HasError) {
              LoaderService.hide();
              var alertPopup = $ionicPopup.alert({
                      title: 'Authentication Error',
                      template: data.ErrorMessage
                  });
          }
          }).error(function(data) {
              LoaderService.hide();
               $scope.username = null;
                $scope.pwd = null;
                var msg = "Please try again";
                 var alertPopup = $ionicPopup.alert({
                      title: 'Authentication Error',
                      template: msg
                  });
          });


      };
      
  }

})
.controller('employeeSkillsCtrl', function($scope, EmployeeSkillsService, skillDetailsServices, LoaderService, $ionicPopup, $state, $ionicSideMenuDelegate) {

      $scope.tsList = {};
      $scope.emptyMessage="";

      $scope.doRefreshEmployeeSkills = function () {
        $state.go($state.current, {}, {reload: true});
      };



      LoaderService.show();

      EmployeeSkillsService.getEmployeeSkills().success(function(data) {

        $scope.tsList = data;
        var arrList = data.GetAllEmpSkillsListForManagerApprovalResult;
        if(arrList == null || arrList.length <= 0)
        {
              $scope.emptyMessage="No records available";
              document.getElementById('emptyMsg').className += ' margin-top display-block';
        }
        else if(arrList.EmpSkillResponseList == null || arrList.EmpSkillResponseList.length <= 0)
        {
              $scope.emptyMessage="No records available";
              document.getElementById('emptyMsg').className += ' margin-top display-block';
        }   
        LoaderService.hide();
        $state.go('app.employeeSkills');
        

      }).error(function(data) {
          LoaderService.hide();
          var alertPopup = $ionicPopup.alert({
              title: 'Network Error',
              template: data.error
          });
           LoaderService.hide();
      });

      //Accordion helpers
       /*
       * if given group is the selected group, deselect it
       * else, select the given group
       */
      $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
          $scope.shownGroup = null;
        } else {
          $scope.shownGroup = group;
        }
      };
      $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
      };


      $scope.viewEmployeeSkills = function(empId){
          sessionStorage.setItem('empId', empId);
         // EmployeeSkillsService.setEmpId = empId;

          $state.go('app.skillsDetail');            
      }




})
.controller('skillsDetailCtrl', function($scope, $stateParams, $state, skillDetailsServices,EmployeeSkillsService, SkillApproveServices,SkillRejectionServices, LoaderService, $ionicPopup, $state, $ionicSideMenuDelegate) {


    $scope.skillList = {};
    $scope.emptyMessage="";
    LoaderService.show();
   // var _empId = EmployeeSkillsService.getEmpId;

    skillDetailsServices.skillDetails().success(function(data) {

      $scope.empSkillList = data.GetIndivudualSkillsListForManagerApprovalResult.EmpSkillResponseList;
      if($scope.empSkillList && $scope.empSkillList.length==0)
      {
      $scope.emptyMessage="No records available";
      $('.emptyMsg').addClass('margin-top');
      document.getElementById('emptyMsg').className += ' margin-top display-block';

      }   
      LoaderService.hide();
      $state.go('app.skillsDetail');


    }).error(function(data) {
      LoaderService.hide();
      var alertPopup = $ionicPopup.alert({
      title: 'Network Error',
      template: data.error
      });
      LoaderService.hide();
    });    

    $scope.selection=[];
  // toggle selection for a given employee by name
  $scope.toggleSelection = function toggleSelection(employeeName) {
     var idx = $scope.selection.indexOf(employeeName);

     // is currently selected
     if (idx > -1) {
       $scope.selection.splice(idx, 1);
       console.log($scope.selection);
     }

     // is newly selected
     else {
       $scope.selection.push(employeeName);
       console.log($scope.selection);
     }
   };


    $scope.approveSkills = function() {
       
        var confirmPopup = $ionicPopup.confirm({
         title: 'Approve Skills',
         template: 'Are you sure you want to approve the selected skills?'
       });
       confirmPopup.then(function(res) {
        LoaderService.show();

         if(res) {
          //Approve the timesheet
          SkillApproveServices.approveSkills($scope.selection).success(function(data) {
            $scope.result = data;
            LoaderService.hide();      
            console.log("Reload");
            $state.go($state.current, {}, {reload: true});

          }).error(function(data) {
              var alertPopup = $ionicPopup.alert({
                  title: 'Network Error',
                  template: data.error
              });
              LoaderService.hide();
          });
          // console.log('You are sure');
         } else {
           LoaderService.hide();
           console.log('You are not sure');
         }
       });
     };


    $scope.rejectSkills = function() {
      $scope.remarkSkills = { text: "" }
       var myPopup = $ionicPopup.show({
         templateUrl : 'popupSkills-template.html',
         scope: $scope,
         buttons: [
           { text: 'Cancel',
             onTap: function(e) {
              
               return 'cancel button'
             }
           },
           {
             text: '<b>Ok</b>',
             type: 'button-positive',
             onTap: function(e) {          
               return 'ok'
             }
           },
         ]
       });
      myPopup.then(function(res) {
        if(res === 'ok') {
          LoaderService.show();
          console.log($scope.remarkSkills.text);

          SkillRejectionServices.rejectSkills($scope.selection, $scope.remarkSkills.text).success(function(data) {
          $scope.result = data;
          LoaderService.hide();          
           $state.go($state.current, {}, {reload: true});
          }).error(function(data) {
              LoaderService.hide();
              var alertPopup = $ionicPopup.alert({
                  title: 'Network Error',
                  template: data.error
              });
          });    
        }
         
     });


  }; 





  })


.controller('TRapprovalsCtrl', function($scope, HRRFApprovalService, HRRFAcceptService, HRRFRejectService, LoaderService, $ionicPopup, $state) {
 /* $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];*/

  $scope.doRefresh = function () {
    $state.go($state.current, {}, {reload: true});
  };
  $scope.tsList = {};
  $scope.emptyMessage="";
  LoaderService.show();

    HRRFApprovalService.getTR().success(function(data) {

      var TRarr = data.GetApprovalListExternalfullfillmentHrrfsResult;

    if (TRarr == null || TRarr.length <=0) {
      $scope.emptyMessage="No records available";
     // $('.emptyMsg').addClass('margin-top');
      document.getElementById('emptyMsg').className += ' margin-top display-block';
       LoaderService.hide();
    }else if ( TRarr.ExternalFulFillementResponseList == null || TRarr.ExternalFulFillementResponseList.length <=0 )   {
       $scope.emptyMessage="No records available";
     // $('.emptyMsg').addClass('margin-top');
      document.getElementById('emptyMsg').className += ' margin-top display-block';
       LoaderService.hide();

    }else{
      $scope.tsList = data.GetApprovalListExternalfullfillmentHrrfsResult.ExternalFulFillementResponseList;

       for (var i=0; i<$scope.tsList.length; i++){

       /* var str = $scope.tsList[i].RequestedDate, str2 = $scope.tsList[i].HRRF.HRRFSubmitedDate;
        var res = str.substring(6, 24), res2 = str2.substring(6, 24);
        //console.log(res);

        $scope.tsList[i].RequestedDateStr = new Date(parseInt(res));
        $scope.tsList[i].HRRFSubmitedDateStr = new Date(parseInt(res2)); */

        var str = $scope.tsList[i].RequestedDate;
        var res = str.substring(6, 24);
        //console.log(res);
        var str1 = $scope.tsList[i].HRRF.HRRFSubmitedDate;
        var res1 = str1.substring(6, 24);

        var str2 = $scope.tsList[i].HRRF.AssignmentStartDate;
        var res2 = str2.substring(6, 24);

        var str3 = $scope.tsList[i].HRRF.AssignmentEndDate;
        var res3 = str3.substring(6, 24);
        
        $scope.tsList[i].RequestedDateStr = new Date(parseInt(res));
         $scope.tsList[i].RequestedDateStr1 = new Date(parseInt(res1));
         $scope.tsList[i].RequestedDateStr2 = new Date(parseInt(res2));
         $scope.tsList[i].RequestedDateStr3 = new Date(parseInt(res3));

        
        }
        LoaderService.hide();
        $state.go('app.TRapprovals');
        }

      }).error(function(data) {
          LoaderService.hide();
          var alertPopup = $ionicPopup.alert({
              title: 'Network Error',
              template: data.error
          });
           LoaderService.hide();
      });

      //Accordion helpers
       /*
       * if given group is the selected group, deselect it
       * else, select the given group
       */
      $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
          $scope.shownGroup = null;
        } else {
          $scope.shownGroup = group;
        }
      };
      $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
      };
    
  

       $scope.acceptHRRFRequest = function(HRRFNumber) {
        var HRRFNumber = HRRFNumber;
        var confirmPopup = $ionicPopup.confirm({
         title: 'Approve Request',
         template: 'Are you sure you want to approve this Request?'
       });
       confirmPopup.then(function(res) {
        LoaderService.show();

         if(res) {
          //Approve the timesheet
          HRRFAcceptService.acceptHRRF(HRRFNumber).success(function(data) {
            $scope.result = data;
            LoaderService.hide();      
            console.log("Reload");
            $state.go($state.current, {}, {reload: true});

          }).error(function(data) {
              var alertPopup = $ionicPopup.alert({
                  title: 'Network Error',
                  template: data.error
              });
              LoaderService.hide();
          });
          // console.log('You are sure');
         } else {
           LoaderService.hide();
           console.log('You are not sure');
         }
       });
     };


  
    $scope.rejectHRRFRequest = function(HRRFNumber) {
      var _HRRFNumber = HRRFNumber ; 


      $scope.remark = { text: "" }
       var myPopup = $ionicPopup.show({
         templateUrl : 'popup-template.html',
         scope: $scope,
         buttons: [
           { text: 'Cancel',
             onTap: function(e) {
              
               return 'cancel button'
             }
           },
           {
             text: '<b>Ok</b>',
             type: 'button-positive',
             onTap: function(e) {          
               return 'ok'
             }
           },
         ]
       });
      myPopup.then(function(res) {
        if(res === 'ok') {
          LoaderService.show();
          console.log($scope.remark.text);

          HRRFRejectService.rejectHRRF(_HRRFNumber, $scope.remark.text).success(function(data) {
          $scope.result = data;
          LoaderService.hide();

          
           $state.go($state.current, {}, {reload: true});

          }).error(function(data) {
              LoaderService.hide();
              var alertPopup = $ionicPopup.alert({
                  title: 'Network Error',
                  template: data.error
              });
          });    
        }
         
     });


  }; 
    
})

.controller('AppCtrl', function($scope, $stateParams, $state) {
     var _userData = JSON.parse(sessionStorage.getItem('userData'));
         $scope.username = _userData.UserFullName;
        $scope.loadDashboard = function () {
          $state.go('dashboard');
        }
       
});

