import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const colorMapBg = {
  R: "#D3DCD8",
  I: "#D6DDFB",
  A: "#F4E5D2",
  S: "#DDD7EE",
  E: "#EBCFCF",
  C: "#EACFEE",
};
const colorMap = {
  R: "#819A91",

  I: "#687FE5",
  A: "#DEAA79",
  S: "#8E7DBE",
  E: "#AF3E3E",
  C: "#a23eaf",
};

const typeNameMap = {
  R: "Practical Power",
  I: "Analytical Power",
  A: "Creative Power",
  S: "Helping Power",
  E: "Leadership Power",
  C: "Organizing Power",
};

const title = {
  R: "The Ultimate Doer",
  I: "The Analytical Genius",
  A: "The Master Creator",
  S: "The Heartfelt Helper",
  E: "The Charismatic Leader",
  C: "The Chief Organizer",
};

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: 1, // Thickness of the line
    borderBottomColor: "#ccc", // Line color
    marginBottom: 10,
    marginTop: 5,
  },
  page: {
    padding: 25,
    fontSize: 12,
    fontFamily: "Helvetica",
    backgroundColor: "#f9f9f9",
  },
  section: {
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 8,
    marginBottom: 5,
    color: "#ccc",
    fontStyle: "italic",
  },
  headerSubTitle: {
    fontSize: 6,
    marginBottom: 5,
    color: "#ccc",
    fontStyle: "italic",
  },
  footer: {
    position: "absolute",
    bottom: 15,
    left: 25,
    right: 25,
  },
  footerTitle: {
    fontSize: 8,
    marginBottom: 5,
    color: "#ccc",
    fontStyle: "italic",
    textAlign: "center",
  },
  footerSubTitle: {
    fontSize: 6,
    marginBottom: 5,
    color: "#ccc",
    fontStyle: "italic",
    textAlign: "center",
  },

  pageNumber: {
    fontSize: 6,
    color: "#ccc",
    fontStyle: "italic",
    position: "absolute",
    right: 0,
    bottom: 2,
  },
  mainHeadingTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4A148C",
    fontStyle: "italic",
  },
  subHeadingTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#1A001A",
    fontStyle: "italic",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    color: "#1F2937",
  },
  careerTypeHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    color: "#4A148C",
    fontStyle: "italic",
    textAlign: "center",
  },
  subsectionDesc: {
    fontSize: 10,
    fontWeight: "normal",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    color: "#1F2937",
    lineHeight: 2,
    textAlign: "justify",
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 5,
    color: "#1F2937",
  },
  barContainer: {
    width: "100%",
    backgroundColor: "#E5E7EB",
    borderRadius: 5,
    height: 12,
    marginBottom: 6,
  },
  barFill: {
    height: "100%",
    borderRadius: 5,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  label: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1F2937",
  },
  percentage: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1F2937",
  },
  workplaceHabitsBox: {
    backgroundColor: "#e0eaf4",
  },
  careerPathBox: { backgroundColor: "#e0ece8" },
  seekingNewChallengesBox: { backgroundColor: "#e920630d" },
  whatToImproveBox: { backgroundColor: "#E0F2FE" },
  idealFutureBox: { backgroundColor: "#e920630d" },
  box: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#e0eaf4",
  },
  traitBox: {
    marginBottom: 12,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    border: "1 solid #ccc",
  },
  traitTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#1F2937",
  },
  traitDesc: {
    fontSize: 12,
    lineHeight: 1.5,
    color: "#374151",
  },
  chartBox: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
});

const PDFHeader = () => (
  <View>
    <Text style={styles.headerTitle}>3QTests By APSS</Text>
    <Text style={styles.headerSubTitle}>Career Assessment Report</Text>
    <Text
      style={styles.pageNumber}
      render={({ pageNumber }) => `Page ${pageNumber}`}
    />
  </View>
);

const PDFFooter = () => (
  <View style={styles.footer}>
    <Text style={styles.divider}></Text>
    <Text style={styles.footerTitle}>
      {" "}
      © 2025 3QTests by APSS · www.3qtests.com
    </Text>
    <Text style={styles.footerSubTitle}>
      This report provides general guidance and should not be considered as a
      substitute for professional career counselling.
    </Text>
  </View>
);

const CareerAssessmentPDF = ({ result, user }) => {
  console.log("result", result);
  const percentageMap = {
    R: result.realistic.percentage,
    I: result.investigative.percentage,
    A: result.artistic.percentage,

    S: result.social.percentage,
    E: result.enterprising.percentage,
    C: result.conventional.percentage,
  };
  return (
    <Document>
      {/* Results Overview */}

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.mainHeadingTitle}>The 3QTests By APSS.</Text>
          <Text style={styles.subHeadingTitle}>Career Assessment Report</Text>
          <Text
            style={[
              styles.subHeadingTitle,
              { position: "absolute", top: 10, right: 0 },
            ]}
          >
            Name: {user.name}
          </Text>
          <Text
            style={[
              styles.subHeadingTitle,
              { position: "absolute", top: 25, right: 0 },
            ]}
          >
            Generated on:{" "}
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Text>

          <Text style={styles.divider}></Text>
          <Text style={styles.careerTypeHeading}>
            {result.primaryCareerMatch.title}
          </Text>

          {result.matchedCareers.map((item, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>{typeNameMap[item.type]}</Text>
                <Text style={styles.percentage}>
                  {percentageMap[item.type]}%
                </Text>
              </View>
              <View style={styles.barContainer}>
                <View
                  style={[
                    styles.barFill,
                    {
                      width: `${percentageMap[item.type]}%`,
                      backgroundColor: colorMap[item.type] || "#ccc",
                    },
                  ]}
                />
              </View>
            </View>
          ))}

          <View style={styles.box}>
            <Text style={styles.sectionTitle}>Personality Overview</Text>
            <Text style={styles.subsectionDesc}>
              {result.primaryCareerMatch.typeDesc}
            </Text>
          </View>
        </View>
        <View style={styles.box}>
          <Text style={styles.sectionTitle}>Career Insights</Text>
          <Text style={styles.subsectionDesc}>
            {result.primaryCareerMatch.careerDesc}
          </Text>
        </View>

        <PDFFooter />
      </Page>

      {/* Type Analysis */}
      <Page size="A4" style={styles.page}>
        <PDFHeader />
        <Text style={styles.divider}></Text>
        <Text style={styles.sectionTitle}>Type Analysis</Text>
        {result.matchedCareers.map((item, index) => (
          <View
            key={index}
            style={{
              ...styles.box,
              backgroundColor: colorMapBg[item.type] || "#ccc",
              padding: "10px",
            }}
          >
            <Text style={styles.sectionTitle}>
              {item.fullName} - {title[item.type]}
            </Text>
            <Text style={styles.subsectionDesc}>{item.careerDesc}</Text>
          </View>
        ))}
        <PDFFooter />
      </Page>

      {/* Key Personality Traits */}
      <Page size="A4" style={styles.page}>
        <PDFHeader />
        <Text style={styles.divider}></Text>
        <Text style={styles.sectionTitle}>What’s Your Power</Text>
        {result.primaryCareerMatch.powers.map((item, index) => (
          <View key={index} style={styles.box}>
            <Text style={styles.sectionTitle}>{item.title}</Text>
            <Text style={styles.subsectionDesc}>{item.desc}</Text>
          </View>
        ))}
        <PDFFooter />
      </Page>

      {/* Weakness to Transform */}
      <Page size="A4" style={styles.page}>
        <PDFHeader />
        <Text style={styles.divider}></Text>
        <Text style={styles.sectionTitle}>Weakness To Transform</Text>
        {result.primaryCareerMatch.weaknesses.map((item, index) => (
          <View key={index} style={styles.box}>
            <Text style={styles.sectionTitle}>{item.title}</Text>
            <Text style={styles.subsectionDesc}>{item.desc}</Text>
          </View>
        ))}
        <PDFFooter />
      </Page>

      {/* Workplace Habits,Career Path  */}
      <Page size="A4" style={styles.page}>
        <PDFHeader />
        <Text style={styles.divider}></Text>
        <View style={[styles.box, styles.workplaceHabitsBox]}>
          <Text style={styles.sectionTitle}>Workplace Habits</Text>
          <Text style={styles.subsectionDesc}>
            {result.primaryCareerMatch.workplaceHabits.desc}
          </Text>
        </View>
        <View style={[styles.box, styles.careerPathBox]}>
          <Text style={styles.sectionTitle}>Career Paths</Text>
          <Text style={styles.subsectionDesc}>
            {result.primaryCareerMatch.careerPaths.desc}
          </Text>
        </View>
        {result.primaryCareerMatch.seekingNewChallenges && (
          <View style={[styles.box, styles.seekingNewChallengesBox]}>
            <Text style={styles.sectionTitle}>Seeking New Challenges</Text>
            <Text style={styles.subsectionDesc}>
              {result.primaryCareerMatch.seekingNewChallenges?.desc}
            </Text>
          </View>
        )}
        {result.primaryCareerMatch.whatToImprove && (
          <View style={[styles.box, styles.seekingNewChallengesBox]}>
            <Text style={styles.sectionTitle}>What To Improve</Text>
            <Text style={styles.subsectionDesc}>
              {result.primaryCareerMatch.whatToImprove?.desc}
            </Text>
          </View>
        )}
        {result.primaryCareerMatch.idealFuture && (
          <View style={[styles.box, styles.seekingNewChallengesBox]}>
            <Text style={styles.sectionTitle}>Ideal Future</Text>
            <Text style={styles.subsectionDesc}>
              {result.primaryCareerMatch.idealFuture?.desc}
            </Text>
          </View>
        )}
        <PDFFooter />
      </Page>
    </Document>
  );
};

export default CareerAssessmentPDF;
