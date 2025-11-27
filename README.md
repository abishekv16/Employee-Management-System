👥 Employee Management System:
-------------------------------
The Employee Management Module is used to manage employee information for each store. Each employee is mapped to a specific store and the Admin can perform complete CRUD operations along with filtering and searching functionalities. This helps in efficiently tracking staff details and organizing workforce distribution across all stores.

🏬 Store & Employee Mapping:
----------------------------
-> Each employee is associated with a specific store using One-to-Many / Many-to-One relationship.
-> Admin can view employees belonging to a selected store.
-> Helps in tracking staff allocation store-wise.

🔧 Core Functionalities:
-------------------------
➕ **Add Employee:** Admin can register a new employee with details such as name, phone number, gender, address, and assigned store.

✏️ **Update Employee**

Modify employee details like phone number, address, or shift location.

🗑️ Remove Employee

Delete employee records when they leave the company or change stores.

📄 Fetch Employee Details

View all employees working under a specific store.

Display complete employee profile and store assignment.

🔎 Filter & Search Options

🔢 Filter by Employee ID

📞 Filter by Employee Phone Number

🏷️ Filter by Store Assignment

🔍 Search employees by name or gender

💻 Technical Highlights

Backend: Java, Spring Boot, Hibernate (JPA)

Frontend: ReactJS / HTML, CSS, JavaScript

Database: MySQL (Employee table mapped with Store table)

Architecture: RESTful APIs, MVC Design Pattern

Annotations Used: @Entity, @ManyToOne, @OneToMany, @Id, @Column

🎯 Outcome

The Employee Management module helps admins effectively maintain employee records, ensure store-wise allocation, and quickly retrieve or update employee information using advanced filtering and search features.
