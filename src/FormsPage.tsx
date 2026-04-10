import { useState } from "react";
import { User, FormApplication, Page } from "./types";
import { genId, validate } from "./utils";
import { Input, Textarea, Btn, Card, PageTitle, Alert, Select } from "./components";
import { LogOut, FileText, Shirt, UserPlus } from "lucide-react";

// ─── Logo imports ─────────────────────────────────────────────────────────────
// Fixed missing logos - using placeholders
const cbeamLogo  = "";
const ceasLogo   = "";
const citeLogo   = "";
const cihtmLogo  = "";
const conLogo    = "";
const ccjeLogo   = "";


// ─── Department definitions ───────────────────────────────────────────────────

interface Department {
  abbr: string;
  name: string;
  color: string;
  logo?: string;
}

const DEPARTMENTS: Department[] = [
  { abbr: "CBEAM",  name: "College of Business, Entrepreneurship & Accountancy Management", color: "#fffbeb", logo: cbeamLogo  },
  { abbr: "CEAS",   name: "College of Education, Arts & Sciences",                           color: "#eff6ff", logo: ceasLogo   },
  { abbr: "CITE",   name: "College of Information Technology & Engineering",                 color: "#fee2e2", logo: citeLogo   },
  { abbr: "CIHTM",  name: "College of International Hospitality & Tourism Management",       color: "#f0fdf4", logo: cihtmLogo  },
  { abbr: "CON",    name: "College of Nursing",                                              color: "#ecfdf5", logo: conLogo    },
  { abbr: "CCJE",   name: "College of Criminal Justice Education",                           color: "#f3e8ff", logo: ccjeLogo },
];

// ─── Forms Selection Page ─────────────────────────────────────────────────────

export function FormsPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const formCards = [
    { page: "form_pullout" as Page,       title: "Pull-out Form",              desc: "Request to be pulled out from class for official activities.", icon: <LogOut size={36} />,       color: "#e6f5ee" },
    { page: "form_poa" as Page,           title: "Program of Activities",       desc: "Submit a program for an upcoming org activity or event.",      icon: <FileText size={36} />,       color: "#eff6ff" },
    { page: "form_nonuniform" as Page,    title: "Non-Wearing of Uniform",      desc: "Request permission for not wearing school uniform.",           icon: <Shirt size={36} />,       color: "#fefce8" },
    { page: "form_externalguest" as Page, title: "External Guest & Visitor",    desc: "Request entry for external guests or visitors to campus.",     icon: <UserPlus size={36} />, color: "#fdf4ff" },
  ];

  return (
    <div>
      <PageTitle>Apply Forms</PageTitle>
      <Alert type="info">
        Select a form below to apply. Your submitted forms require approval from CSAO, Dean, and Student Services. You can track the status in the Tracking page.
      </Alert>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        {formCards.map((fc) => (
          <button
            key={fc.page}
            onClick={() => onNavigate(fc.page)}
            style={{
              background: fc.color,
              border: "2px solid #c6e8d8",
              borderRadius: 16,
              padding: 28,
              textAlign: "left",
              cursor: "pointer",
              transition: "transform 0.15s, box-shadow 0.15s",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-4px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(26,122,74,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "";
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 12 }}>{fc.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 18, color: "#1a1a1a", marginBottom: 8 }}>{fc.title}</div>
            <div style={{ fontSize: 15, color: "#4b7a62", lineHeight: 1.5 }}>{fc.desc}</div>
            <div style={{ marginTop: 16, color: "#1a7a4a", fontWeight: 700, fontSize: 15 }}>Apply →</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Success Message ──────────────────────────────────────────────────────────

export function SuccessMsg({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <Card style={{ maxWidth: 500, textAlign: "center" }}>
      <div style={{ fontSize: 56, marginBottom: 16, fontWeight: 700 }}>Success</div>
      <h2 style={{ color: "#1a7a4a", marginTop: 0 }}>{title}</h2>
      <p style={{ color: "#4b7a62", fontSize: 16 }}>
        Your form has been submitted. You can track its status in the Tracking page. If urgent, use the Reminder button to notify approvers.
      </p>
      <Btn onClick={onBack}>← Back to Forms</Btn>
    </Card>
  );
}

// ─── Pull-out Form — Step 1: Department Selector ──────────────────────────────

function DepartmentSelector({
  selected,
  onSelect,
  onContinue,
  onBack,
}: {
  selected: Department | null;
  onSelect: (dept: Department) => void;
  onContinue: () => void;
  onBack: () => void;
}) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <Btn variant="ghost" size="sm" onClick={onBack}>← Back</Btn>
        <PageTitle>Pull-out Form</PageTitle>
      </div>
      <p style={{ fontSize: 14, color: "#888", margin: "0 0 8px" }}>Step 1 of 2</p>
      <p style={{ fontSize: 16, color: "#4b7a62", marginBottom: 24 }}>
        Select your college department to continue.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18, marginBottom: 28 }}>
        {DEPARTMENTS.map((dept) => {
          const isSelected = selected?.abbr === dept.abbr;
          return (
            <button
              key={dept.abbr}
              onClick={() => onSelect(dept)}
              style={{
                background: dept.color,
                border: isSelected ? "3px solid #1a7a4a" : "2px solid #c6e8d8",
                borderRadius: 16,
                padding: "24px 18px",
                textAlign: "center",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(26,122,74,0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "";
              }}
            >
              {/* Logo circle — shows logo if provided, otherwise a placeholder */}
              <div
                style={{
                  width: 85,
                  height: 85,
                  borderRadius: "50%",
                  background: "#fff",
                  border: "2px solid #ddd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
                  overflow: "hidden",
                }}
              >
                {dept.logo ? (
                  <img
                    src={dept.logo}
                    alt={`${dept.abbr} logo`}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                ) : (
                  <span style={{ fontSize: 12, color: "#bbb", textAlign: "center", lineHeight: 1.3, padding: 6 }}>
                    Your<br />Logo
                  </span>
                )}
              </div>
              <div style={{ fontWeight: 700, fontSize: 18, color: "#1a1a1a", marginBottom: 6 }}>{dept.abbr}</div>
              <div style={{ fontSize: 14, color: "#4b7a62", lineHeight: 1.4 }}>{dept.name}</div>
              {isSelected && (
                <div style={{ marginTop: 12, color: "#1a7a4a", fontSize: 14, fontWeight: 700 }}>✓ Selected</div>
              )}
            </button>
          );
        })}
      </div>

      <div style={{ textAlign: "center" }}>
        <Btn onClick={onContinue} disabled={!selected}>
          Continue →
        </Btn>
      </div>
    </div>
  );
}

// ─── Stub Forms (implement fully later) ──────────────────────────────────────

export function ProgramOfActivitiesForm({ user, onSubmit, onBack }: { user: User; onSubmit: (app: FormApplication) => void; onBack: () => void; }) {
  const handleSubmit = () => {
    onSubmit({
      id: genId(),
      studentId: user.id,
      studentName: user.name,
      type: "program_of_activities" as const,
      submittedAt: new Date().toISOString(),
      status: "pending",
      deanStatus: "pending",
      csaoStatus: "pending",
      studentServicesStatus: "pending",
      details: { activityName: "Sample POA", venue: "Sample", org: user.org || "" },
      date: new Date().toISOString().split('T')[0],
    });
  };
  return (
    <div>
      <PageTitle>Program of Activities (Stub)</PageTitle>
      <Alert type="info">Stub implementation. Full form coming soon.</Alert>
      <div style={{ display: "flex", gap: 10 }}>
        <Btn onClick={handleSubmit}>Submit Stub POA</Btn>
        <Btn variant="outline" onClick={onBack}>Back</Btn>
      </div>
    </div>
  );
}

export function NonUniformForm({ user, onSubmit, onBack }: { user: User; onSubmit: (app: FormApplication) => void; onBack: () => void; }) {
  const handleSubmit = () => {
    onSubmit({
      id: genId(),
      studentId: user.id,
      studentName: user.name,
      type: "non_uniform" as const,
      submittedAt: new Date().toISOString(),
      status: "pending",
      deanStatus: "pending",
      csaoStatus: "pending",
      studentServicesStatus: "pending",
      details: { reason: "Sample non-uniform" },
      date: new Date().toISOString().split('T')[0],
    });
  };
  return (
    <div>
      <PageTitle>Non-Uniform (Stub)</PageTitle>
      <Alert type="info">Stub implementation. Full form coming soon.</Alert>
      <div style={{ display: "flex", gap: 10 }}>
        <Btn onClick={handleSubmit}>Submit Stub</Btn>
        <Btn variant="outline" onClick={onBack}>Back</Btn>
      </div>
    </div>
  );
}

export function ExternalGuestForm({ user, onSubmit, onBack }: { user: User; onSubmit: (app: FormApplication) => void; onBack: () => void; }) {
  const handleSubmit = () => {
    onSubmit({
      id: genId(),
      studentId: user.id,
      studentName: user.name,
      type: "external_guest" as const,
      submittedAt: new Date().toISOString(),
      status: "pending",
      deanStatus: "pending",
      csaoStatus: "pending",
      studentServicesStatus: "pending",
      details: { guestName: "Sample Guest" },
      date: new Date().toISOString().split('T')[0],
    });
  };
  return (
    <div>
      <PageTitle>External Guest (Stub)</PageTitle>
      <Alert type="info">Stub implementation. Full form coming soon.</Alert>
      <div style={{ display: "flex", gap: 10 }}>
        <Btn onClick={handleSubmit}>Submit Stub</Btn>
        <Btn variant="outline" onClick={onBack}>Back</Btn>
      </div>
    </div>
  );
}

