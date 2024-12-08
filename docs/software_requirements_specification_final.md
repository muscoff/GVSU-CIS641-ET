# Functional Requirements
1. **Account Registration**
* 1.1 - The system shall collect User's fullname from the registration form
* 1.2 - The system shall collect User's username and password from the registration form
* 1.2.1 - If username or password is not provided, the registration form will not process the registration request and user will be asked to provide those details.
* 1.2.2 - If username already exists, the registration form will prompt the user to provide a new username.
* 1.2.3 - If the password does not match the required length for a valid password, the registration form will not process the registration request and user will be asked to provide a valid password.
* 1.3 - If the registration form acquires all the required fields, the system shall process the registration request and an account will be created for the user.

2. **Login Form**
* 2.1 - Username and password will be collected from the login form.
* 2.1.1 - If username or password is not provided, the login form will not process the request and the user would be prompted to provide those details.
* 2.1.2 - If username and password does not match a valid user in the login table, the user will be prompted to provide a valid login credentials.
* 2.2 - If username is not found in the login table, the user is redirected to the account registration page to create an account.

3. **Search product**
* 3.1 - User can search for product from the search bar
* 3.1.1 - If nothing is typed in the search bar and user press the enter key, nothing would happen dynamically to the page.
* 3.1.2 - If a user starts typing something in the search bar, the content on the page would  dynamically change to match the filtered results of the search.
* 3.1.3 - If no results is found from the search, the page would show nothing at the product section

4. **Cart**
* 4.1 - User can add items to the cart
* 4.1.1 - If a user tries to add an item to the cart that is already in the cart, the quantity of the item will be incremented by 1.
* 4.2 - User can remove item(s) from the cart
* 4.2.1 - User can empty the entire cart from a button press
* 4.3 - User can view items in the cart.

5. **Orders**
* 5.1 - Users can view all processed and unprocessed orders.
* 5.2 - Users cannot change the order made for a particular date.
* 5.3 - Admin is able to see all processed and unprocessed orders of different users
* 5.4 - Admin can check which products they are done processing and ready to be shipped.
* 5.5 - Admin can update the orders that have been processed in the json database.


# Non-Functional Requirement
1. **Account Registration**
1.1 The software shall be user-friendly supporting different device screen sizes
1.2. The software shall retain some user information for easy retrieval
1.3. The software request-response time shall be under 500ms
1.4. The software shall provide security ensuring that user privacy is protected.
1.5. The app shall provide both frontend checks and backend checks to ensure the security and integrity of the application.

2. **Login Form**
2.1. The app shall provide notifications to users during authentication
2.2 The app shall retain some information which comes from request if it was successful to use in other pages.
2.3 The app shall have a fast response time.
2.4. The app shall be well laid out to ensure user satisfaction.
2.5. The app shall render well on different device screen sizes without facing the functionality of any component

3. **Search**
3.1. The app shall have a fast response time during search
3.2. The app shall show only relevant filtered list to the users
3.3. The app shall provide a dynamic page display during search.
3.4. The app shall be well laid out to ensure user satisfaction.
3.5. The app shall render well on different device screen sizes showing all search results

4. **Cart**
4.1. The app shall save cart information locally on the device
4.2. The app shall display cart information swiftly on the device
4.3. The app shall render page update very fast upon change in cart information.
4.4. The app shall ensure that cart information are easily accessible.
4.5. The app shall render well on different device screen sizes showing all search results

5. **Orders**
5.1. The app shall provide a fast request-response time when fetching data from the backend 
5.2. The app shall provide appropriate icons to indicate changes in processes
5.3. The app shall render page update very fast upon change in order processing.
5.4. The app shall ensure that orders are easily accessible.
5.5. The app shall render well on different device screen sizes showing all search results


# [Change Management Plan](https://github.com/muscoff/GVSU-CIS641-ET/blob/main/artifacts/Change_Management_Plan.pdf)

## Training
The ET – Platform is actually an easy to use application that enables buyers and sellers to easily onboard themselves on the app without any extra tutorials or help.
ET is a simple app that fulfills the standard e-commerce app that most people have interacted with.
On the front page of the app, it states the main and core purpose of the way. After navigating to the appropriate page(either users or admin), there is a simple form that is self-explanatory which requires users to create an account before using the app. This process is same if it is a seller that wants to use the app.

## Integration
Integrating the app into the ecosystem is quite simple as the API endpoint writing for this application is simple and straightforward. For database, this application is using a json file as its database. Hence, if someone want to implement a different database into the software, they only need to change the read and write to the file to link to their new or existing database and everything will smoothly run without any issues.

## Issues
The app is simple although it functions like a normal big e-commerce app. The files are written in plain, simple javascript and so, updating or resolving issues is a simple google search. I must add that there are no complicated dependencies been used and so, there is little to no issues to be discovered with the app since it does not depend on external dependencies that could break in the future. 


# Traceability links
Description of this section

## Use Case Diagram Traceability
| Artifact ID | Artifact Name | Requirement ID |
| :-------------: | :----------: | :----------: |
| Login           | use-case.png | FR2          |
| Register        | use-case.png | FR1          |

![Use case Diagram](https://github.com/muscoff/GVSU-CIS641-ET/blob/main/artifacts/use-case.png)


## Class Diagram Traceability
| Artifact Name         | Requirement ID |
| :-------------:       |:----------:    |
| activity-diagram.png  | FR1, FR2       |

![Activity Diagram](https://github.com/muscoff/GVSU-CIS641-ET/blob/main/artifacts/activity-diagram.png)


