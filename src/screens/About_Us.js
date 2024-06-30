import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const About_Us = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>About Labour Link</Text>

      <Text style={styles.paragraph}>
        Welcome to Labour Link, a comprehensive platform designed to streamline
        the process of finding, hiring, and managing laborers for various tasks
        and projects. Whether you're a customer in need of skilled workers or a
        worker looking for job opportunities, Labour Link provides a seamless
        and efficient solution to connect users with the right resources.
      </Text>

      <Text style={styles.paragraph}>
        Our mission at Labour Link is to revolutionize the way people find and
        hire laborers for their tasks and projects. We aim to empower both
        customers and workers by providing them with a user-friendly platform
        that offers a wide range of features and functionalities to meet their
        needs.
      </Text>

      <Text style={styles.heading}>Features Overview</Text>

      <Text style={styles.subheading}>
        User Registration and Authentication
      </Text>
      <Text style={styles.listItem}>
        - User Registration: Customers and workers can easily sign up for an
        account by providing necessary details such as name, email, mobile
        number, NIC number, and password.
      </Text>
      <Text style={styles.listItem}>
        - Input Validation: Our platform ensures data accuracy and security
        through input validation checks for fields such as name, email, NIC
        format, password format, and more.
      </Text>
      <Text style={styles.listItem}>
        - Terms of Service and Privacy Policy: Users agree to our terms of
        service and privacy policy during registration, ensuring transparency
        and legal compliance.
      </Text>
      <Text style={styles.listItem}>
        - Redundancy Check: To prevent duplicate accounts, we perform a
        redundancy check in the database to verify if an account with the
        provided details already exists.
      </Text>

      <Text style={styles.subheading}>User Dashboard</Text>
      <Text style={styles.listItem}>
        For Customers
        {"\n"}- Profile Management: Customers can update their profile
        information, manage passwords, and delete their accounts as needed.
      </Text>
      <Text style={styles.listItem}>
        - Job Selection Category: Choose from a variety of job categories to
        find the right laborers for their tasks.
      </Text>
      <Text style={styles.listItem}>
        - Map View: Customers can view nearby workers on a map using Google API,
        facilitating easier selection and hiring.
      </Text>
      <Text style={styles.listItem}>
        - Communication Tools: In-app messaging and calling features allow
        seamless communication between customers and workers.
      </Text>
      <Text style={styles.listItem}>
        - Feedback and Reviews: Leave feedback and ratings for hired workers,
        enhancing transparency and accountability.
      </Text>

      <Text style={styles.listItem}>
        For Workers
        {"\n"}- Profile Management: Workers can update their profiles, manage
        passwords, and delete accounts.
      </Text>
      <Text style={styles.listItem}>
        - Map View: View customer locations on a map to better understand job
        requirements and locations.
      </Text>
      <Text style={styles.listItem}>
        - Hiring Requests: Access a list of hiring requests received, including
        details such as customer name, job title, and location.
      </Text>
      <Text style={styles.listItem}>
        - Communication: Receive email notifications for work requests and
        communicate with customers via in-app calling.
      </Text>

      <Text style={styles.listItem}>
        For Admins
        {"\n"}- User Profiles Management: Admins can manage user accounts,
        including blocking, suspending, or deleting accounts if necessary.
      </Text>
      <Text style={styles.listItem}>
        - Review Management: Review and manage feedback and ratings to ensure
        compliance with platform policies.
      </Text>
      <Text style={styles.listItem}>
        - Notification Alerts: Receive notifications for new user registrations
        and other important system events.
      </Text>
      <Text style={styles.listItem}>
        - Help and Support: Access resources and documentation, and contact
        support for assistance with technical or operational issues.
      </Text>
      <Text style={styles.listItem}>
        - Access Control: Admins have control over various aspects of the system
        to maintain security and integrity.
      </Text>

      <Text style={styles.paragraph}>
        Our Commitment
        {"\n"}At Labour Link, we are committed to providing a reliable, secure,
        and user-friendly platform for both customers and workers. With our
        extensive features and dedicated support, we strive to make the process
        of finding, hiring, and managing laborers as seamless and efficient as
        possible.
      </Text>

      <Text style={styles.paragraph}>
        Thank you for choosing Labour Link. Let's build a better future
        together!
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
    color: "#0066CC",
  },
  subheading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    color: "#333",
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
    color: "#666",
  },
});

export default About_Us;
