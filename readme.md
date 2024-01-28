# End points

Base url

http://localhost:5000/api/v1

# task

->get all tasks (GET)
/task/
->get single task(GET)
/task/:id
->(DELETE, PUT)
/task/:id
->create(POST)
/task/create
body
{
"taskName": "complete it",
"deadline": "2024-01-29",
"status": "pending",
"project":"65b383fb2815807d61b88bad",
"teamMember":"65b3a3957aef1782c0fd1f3b"
}
here teamMember and project will be id of teamMember and project.

# teamMember

-> create(POST)
/teamMember/create
body
{
"name": "Ferdous Hassan",
"avatar": "/images/avatars/ferdous.png"
}

-> getAll teamMember(GET)
/teamMember

# projectName

->create(POST)
/projectsName/create
body example
{
"projectName": "Job Finder",
"colorClass": "color-jobFinder"
}

->get all projectName(GET)
/projectsName/
