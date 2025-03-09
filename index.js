// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

// Get the leaners id
function getLearnersID(submissions) {
  // Use map to iterate the submissions array then return all learn_id
  // I used set in order not to get duplicate learner_id
  let learnerIDSet = new Set(
    submissions.map((submission) => submission.learner_id)
  );

  //Convert learnerIDSet into an array
  let learnerID = [];
  learnerIDSet.forEach((id) => learnerID.push(id));

  return learnerID;
}

// Get the assignments that are due
function getAssignmentsDue(ag) {
  let currentDate = new Date();
  // Filter the Assignment group assignment objects and return assignments that are due
  return ag.assignments.filter((assignment) => {
    // Used  new Date String because right now it is a string , so I need it to match my current date variable data type which is an object in order to compare it
    return new Date(assignment.due_at) < currentDate;
  });
}

function getAssignmentScores(ag, submissions) {
  let leanersID = getLearnersID(submissions);
  let assignments = getAssignmentsDue(ag);
  let assignmentScores = [];

  // Iterate through each learner, submission, assignments due
  leanersID.forEach((leaner) => {
    let learnerScore = [];
    for (let i = 0; i < submissions.length; i++) {
      for (let j = 0; j < assignments.length; j++) {
        //match the submission assignment id with assignments due id to only get assignments that are due
        if (submissions[i].assignment_id === assignments[j].id) {
          if (leaner === submissions[i].learner_id) {
            if (
              submissions[i].submission.submitted_at > assignments[j].due_at
            ) {
              let penalty = 0;
              penalty = (10 * assignments[j].points_possible) / 100;
              let score =
                (submissions[i].submission.score - penalty) /
                assignments[j].points_possible;
              score = parseFloat(score.toPrecision(3));
              learnerScore.push(score);
            } else {
              //calculate the total score earned for learner
              // Add assignent 1 and assignment 2 score to assignmentsScores Array
              let score =
                submissions[i].submission.score /
                assignments[j].points_possible;
              score = parseFloat(score.toPrecision(3));
              learnerScore.push(score);
            }
          }
        }
      }
    }
    totalScore = 0;
    assignmentScores.push(learnerScore);
  });
  return assignmentScores;
}

//get score by Id
function getScore(submissions, ag) {
  let leanersID = getLearnersID(submissions);
  let assignments = getAssignmentsDue(ag);
  let totalScore = 0;
  let assignmentScores = [];
  let scores = [];

  // Iterate through each learner, submission, assignments due
  leanersID.forEach((leaner) => {
    for (let i = 0; i < submissions.length; i++) {
      for (let j = 0; j < assignments.length; j++) {
        //match the submission assignment id with assignments due id to only get assignments that are due
        if (submissions[i].assignment_id === assignments[j].id) {
          if (leaner === submissions[i].learner_id) {
            if (
              submissions[i].submission.submitted_at > assignments[j].due_at
            ) {
              let penalty = 0;
              penalty = (10 * assignments[j].points_possible) / 100;
              totalScore += submissions[i].submission.score - penalty;
              assignmentScores.push(submissions[i].submission.score - penalty);
            } else {
              //calculate the total score earned for learner
              totalScore += submissions[i].submission.score;
              // Add assignent 1 and assignment 2 score to assignmentsScores Array
              assignmentScores.push(submissions[i].submission.score);
            }
          }
        }
      }
    }
    scores.push(totalScore);
    totalScore = 0;
  });
  return scores;
}

// Get total possible points
function getTotalPossiblePoints(ag) {
  // Declare an array to save the return array from only the assignments due
  let assignments = getAssignmentsDue(ag);
  // Use reduce to get the total amount of points by adding all points_possible from due assignments
  return assignments.reduce(
    (total, assignment) => (total += assignment.points_possible),
    0
  );
}

//Get weighted Average
function getWeightedAverage(ag, submissions) {
  let learnerId = getLearnersID(submissions);
  let totalPointsPossible = getTotalPossiblePoints(ag);
  let totalScore = getScore(submissions, ag);
  let learnerAverage = 0;
  let average = [];

  for (let i = 0; i < totalScore.length; i++) {
    learnerAverage = totalScore[i] / totalPointsPossible;
    average.push(learnerAverage);
    learnerAverage = 0;
  }

  return average;
}

function getLearnerData(course, ag, submissions) {
  const result = [];

  const learnerIDs = getLearnersID(submissions);
  let average = getWeightedAverage(ag, submissions);
  let scores = getAssignmentScores(ag, submissions);
  let scoresObj = {};

  for (let i = 0; i < learnerIDs.length; i++) {
    let learnerObject = {};
    let k = 0;
    learnerObject.id = learnerIDs[i];
    learnerObject.avg = average[i];
    learnerObject.one = scores[i][k++];
    learnerObject.two = scores[i][k++];

    result.push(learnerObject);
  }
  console.log(result);
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
