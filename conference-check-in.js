Timeslots = new Mongo.Collection("timeslots");
Talks = new Mongo.Collection("talks");
Attendance = new Mongo.Collection("attendance");

if (Meteor.isClient) {
  Template.body.helpers({
    timeslots: function () {
      return Timeslots.find({});
    }
  });

  Template.timeslot.helpers({
    talks: function () {
      return Talks.find({timeslot: this.time});
    }
  });

  Template.talk.helpers({
    attending: function() {
      return Attendance.find({userId: Meteor.userId(), talkName: this.name}).count() > 0;
    },
    count: function () {
      return Attendance.find({talkName: this.name}).count();
    }
  });

  Template.talk.events({
    "change input[type='checkbox']": function (event) {
      if (event.target.checked) {
        Attendance.insert({userId: Meteor.userId(), talkName: event.target.value});
      } else {
        var attendee = Attendance.findOne({userId: Meteor.userId(), talkName: event.target.value});
        Attendance.remove({_id: attendee._id});
      }
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
