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

//If an AssignmentGroup does not belong to its course throw an error

function validateErrors(course, ag, submissions) {
  if (ag.course_id !== course.id) {
    throw new Error(
      "Invalid input! AssignmentGroup does not belong to this course!"
    );
  }
  // If points_possible is 0, or less tnan 0 throw an error
  ag.assignments.forEach((assignment) => {
    if (
      typeof assignment.points_possible !== "number" ||
      assignment.points_possible < 0
    ) {
      throw new Error(
        "Invalid points_possible! Possible Points must be more than 0!"
      );
    }
    if (assignment.points_possible === 0) {
      throw new Error(
        "Invalid possible_points! Possible Points must be greater than 0!"
      );
    }
  });
}

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
  const currentDate = new Date();
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
          // match the learner to the submission
          if (leaner === submissions[i].learner_id) {
            // Determine if an assignment is late
            if (
              submissions[i].submission.submitted_at > assignments[j].due_at
            ) {
              //calculate the score earned for learner
              let penalty = 0;
              // Calculate penalty
              penalty = (10 * assignments[j].points_possible) / 100;
              // Save assignment score
              let score =
                (submissions[i].submission.score - penalty) /
                assignments[j].points_possible;
              // Convert score to 3 significant figures and convert it from String
              score = parseFloat(score.toPrecision(3));
              // Add score to learner Score Array to use later in result
              learnerScore.push(score);
            } else {
              //calculate the score earned for learner
              let score =
                submissions[i].submission.score /
                assignments[j].points_possible;
              // Convert score to 3 significant figures and convert it from String
              score = parseFloat(score.toPrecision(3));
              // Add score to learner Score Array to use later in result
              learnerScore.push(score);
            }
          }
        }
      }
    } // Reset total Score to get another learner scores
    totalScore = 0;
    assignmentScores.push(learnerScore);
  });
  return assignmentScores;
}

//get total score by
function getScore(submissions, ag) {
  const leanersID = getLearnersID(submissions);
  let assignments = getAssignmentsDue(ag);
  let totalScore = 0;
  let islate = false;
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
              islate = true;
              let penalty = 0;
              penalty = (10 * assignments[j].points_possible) / 100;
              totalScore += submissions[i].submission.score - penalty;
              assignmentScores.push(submissions[i].submission.score - penalty);
              continue;
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

  // Iterate over total scores
  for (let i = 0; i < totalScore.length; i++) {
    // Calculate average
    learnerAverage = totalScore[i] / totalPointsPossible;
    // Add average to average array
    average.push(learnerAverage);
    // Reset learner Average in order to calculate for another learner
    learnerAverage = 0;
  }

  return average;
}

function getLearnerData(course, ag, submissions) {
  try {
    validateErrors(course, ag, submissions);

    const result = [];

    const learnerIDs = getLearnersID(submissions);
    const average = getWeightedAverage(ag, submissions);
    const scores = getAssignmentScores(ag, submissions);

    // Iterate over each learner
    for (let i = 0; i < learnerIDs.length; i++) {
      const learnerObject = {};
      let k = 0;
      // Add Keys and values to learner object
      learnerObject.id = learnerIDs[i];
      learnerObject.avg = average[i];
      learnerObject.one = scores[i][k++];
      learnerObject.two = scores[i][k++];

      //Push the learnerObject to the results before mooving on to next learner
      result.push(learnerObject);
    }
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
