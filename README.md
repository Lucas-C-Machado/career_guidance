# 🎓 Career Guidance System

![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

## 🌟 Overview

The **Career Guidance System** is a robust digital solution designed to mitigate academic indecision for students and parents. The system acts as a virtual consultant, providing accurate data on higher education institutions in **Engineering and Management**, covering educational markets in **India and Abroad**.

Through data-driven analysis (CGPA) and a proprietary **Aptitude Test (AT)**, the software directs users toward the best academic opportunities, considering financial feasibility and eligibility requirements.

---

## 📸 Visual Demonstration

### User Interface
> *Real screenshots and video of the student journey within the system.*

| Career Selection | College List | Aptitude Test |
| :---: | :---: | :---: |
| <img src="https://github.com/user-attachments/assets/bd61cf09-3170-4d37-9c75-5dfded65b192" width="300" alt="Career Selection"> | <img src="https://github.com/user-attachments/assets/f6e60fea-c273-47d1-9380-4666f5a14ad7" width="300" alt="College List"> | <video src="https://github.com/user-attachments/assets/47212fe9-1b51-4d2b-96d0-98aa33c0710b" width="100" alt="Aptitude Test"> |

### Video Demonstration
[▶️ Click here to watch the system walkthrough](https://via.placeholder.com/600x400?text=Link+to+Video+on+YouTube/Vimeo)

---

## 🚀 Key Features

### 👤 Student Portal
- **Secure Authentication**: Login and registration via Firebase Auth with profile validation.
- **Smart Filters**: Personalized search by field of study and geographic location.
- **Eligibility Module**: Automatic CGPA verification and SOP (Statement of Purpose) analysis.
- **Aptitude Test (AT)**: Evaluation divided into Verbal, Quantitative, and General Knowledge sections.
- **Results Dashboard**: Immediate performance visualization and history.

### 🛠️ Administrative Panel
- **Institution Management**: CRUD interface to add, edit, or remove colleges.
- **Audit Monitoring**: Detailed logs of all actions performed within the system.
- **Access Control**: Strict separation of permissions between Admin and Student.

---

## 🏗️ System Architecture

The project follows a **Serverless** architecture based on the Firebase ecosystem, ensuring high availability and low latency.

- **Frontend**: Single Page Application (SPA) with state management via LocalStorage.
- **Backend**: Firebase Cloud Functions (optional) and Firestore for real-time data persistence.
- **Security**: Firestore Security Rules for protecting sensitive data.

### Directory Structure
```bash
├── public/              # Static frontend files (HTML, CSS, Images)
│   ├── js/              # Business logic and Firebase integration
│   ├── pages/           # System modules (Login, Admin, Tests)
│   └── css/             # Modular styling
├── src/                 # TypeScript source code
│   ├── services/        # Eligibility logic and calculations
│   └── config/          # Environment configurations
├── tests/               # Automated test suite (Jest)
└── firebase.json        # Hosting and Deploy configurations
```

---

## 🧪 Quality and Testing

To ensure the reliability of business rules, the system uses the **Jest** framework.

### Types of Tests Performed:
1. **Unit**: Validation of score calculation logic and academic eligibility.
2. **Security**: Verification of input formats and credential strength.
3. **Integration**: Data flow between the frontend and Firestore.

**To run the tests:**
```bash
npm test
```

---

## 🛠️ Installation and Setup

1. **Cloning and Dependencies**:
   ```bash
   git clone https://github.com/your-user/career-guidance.git
   cd career-guidance
   npm install
   ```

2. **Firebase Configuration**:
   - Create a project in the [Firebase Console](https://console.firebase.google.com/).
   - Enable **Authentication** (Email/Password) and **Firestore Database**.
   - Update the `public/js/firebase-config.js` file with your credentials.

3. **Execution**:
   ```bash
   firebase serve
   ```

---

## 📚 Bibliographic References

The development of this system was based on vocational guidance methodologies and software architecture:

1. **HOLLAND, John L.** *Making Vocational Choices: A Theory of Vocational Personalities and Work Environments*. Psychological Assessment Resources, 1997.
2. **FIREBASE DOCUMENTATION.** *Best Practices for Security Rules and Scalable Data Modeling*. Available at: [firebase.google.com/docs](https://firebase.google.com/docs).
3. **FOWLER, Martin.** *Patterns of Enterprise Application Architecture*. Addison-Wesley Professional, 2002.
4. **NIELSEN, Jakob.** *10 Usability Heuristics for User Interface Design*. NN/g Group.

---
**Developed with ❤️ to transform the academic future of thousands of students.**
