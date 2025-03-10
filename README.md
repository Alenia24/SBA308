<h1>SBA-308 JavaScrit Fundamentals</h1>
<h2>Description</h2>
<p>A program that gathers course data , processes it, and then outputs a result. 
The data provided is from CourseInfo, Assignment Group, Assignment Info, and Learner Submission.</p>

<h3>Functions</h3>
<ul>
  <li>
    validatErrors - 
    If an assignmentGroup does not belong to its course, the program throws an error. If the program receives a value of 0 from points_possible it throws an error to let the user know that it can be 0.
  </li>
  <br>
  <li>
    getLearnersID -
    This function iterates LearnerSubmission to select all unique learner_id.
  </li>
  <br>
  <li>
    getAssignmentsDue - 
    Filters the AssignmentGroup assignments data and compares the due_at of assignments with the current date and returns all assignments that are due(should have been submitted by learners.    
  </li>
  <br>
  <li>
    getAssignmentScores - 
    Generates the scores of each learner for all due assignments. If an assignment was submitted late, 10% of the points_possible for that assignments is deducted. 
  </li>
  <br>
  <li>
    getScore - 
    Generates the total score of each assignment due that is earnered by leaners.
  </li>
  <br>
  <li>
    getTotalPossiblePoints - 
    Generates the total amount of points of all assignments that are due.
  </li>
  <br>
  <li>
    getWeightedAverage - 
    Generates the average of each learner by diving the total score by the total amount of points possible.
  </li>
  <br>
  <li>
    getLearnerDate is used to return the data generated of each learner (id, avg, and scores of each due assignments).
  </li>
</ul>
