# assignment
The task is very simple. You just need to think twice and follow the below
instruction
1. Create a login screen.
userModel{username,mailId,password}
User API:-
i.crete user
ii.Login User

2. After logging in the student list will appear with filters(name, subject) and
add/edit/view/delete.
After user successfully logind in we have to crete a studen mode
StudentModel{student name,subjectname,marks,user,isdeleted}

3. While adding a student with the student and subject combination that
already exists in the database then include the marks in existing marks.
otherwise, it will create a new student record.
For example, You have a current record in the database
Name Subject Marks
Jhon Maths 75
If we add the same data again
Name Subject Marks
Jhon Maths 50
Then the total should be 125
4. Student data will appear separately as per the logged-in user.