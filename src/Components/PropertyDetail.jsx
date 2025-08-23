// PropertyDetail.jsx
import React from "react";
import {
  ArrowLeft,
  MapPin,
  Building,
  Home,
  DollarSign,
  TrendingUp,
  FileText,
} from "lucide-react";

/**
 * Reusable detail page for a single property
 *
 * Props:
 * - property: {
 *     name, propertyType, status, lastUpdated, targetAmount, occupancy, roi,
 *     photos: string[], address, state, country, postalCode,
 *     yearBuilt, size, ownerEntity, rentalIncome, minInvestment, maxInvestment,
 *     saleFee, totalTokenSupply, tokenizedPercentage, vestingPeriod, kycType,
 *     description, majorLeases, valuerName
 *   }
 * - onBack: () => void         // called when back button clicked
 * - getStatusColor?: (status: string) => string
 * - getROIColor?: (n: number) => string
 * - formatCurrency?: (n: number) => string
 */
export default function PropertyDetail({
  property,
  onBack,
  getStatusColor = (status) => {
    // sensible default badge colors
    const map = {
      Active: "#2ee585",
      Pending: "#f5c84b",
      Suspended: "#ff6b81",
      Draft: "#9aa3b2",
    };
    return map[status] || "#4da3ff";
  },
  getROIColor = (n) => (n >= 0 ? "#2ee585" : "#ff6b81"),
  formatCurrency = (n) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(Number(n || 0)),
}) {
  const p = property || {};

  return (
    <div
      style={{
        backgroundColor: "#0a0a0a",
        color: "#ffffff",
        minHeight: "100vh",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#1a1a1a",
          padding: "20px 40px",
          borderBottom: "1px solid #333333",
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <button
          onClick={onBack}
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "#ffffff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
          }}
        >
          <ArrowLeft size={20} />
          Back to Properties
        </button>
        <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "600" }}>
          Property Details
        </h1>
      </div>

      {/* Property Detail */}
      <div style={{ padding: "40px" }}>
        <div
          style={{
            backgroundColor: "#1a1a1a",
            borderRadius: "12px",
            padding: "40px",
            border: "1px solid #333333",
          }}
        >
          {/* Property Header */}
          <div style={{ display: "flex", gap: "30px", marginBottom: "40px" }}>
            <img
              src={(p.data?.photos && p.data.photos[0]) || "/placeholder-image.jpg"}
              alt={p.name || "property"}
              style={{
                width: "200px",
                height: "150px",
                borderRadius: "12px",
                objectFit: "cover",
                background: "#0a0a0a",
              }}
            />
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  margin: "0 0 10px 0",
                  fontSize: "32px",
                  fontWeight: "700",
                }}
              >
                {p.name}
              </h2>
              <p
                style={{
                  margin: "0 0 15px 0",
                  fontSize: "18px",
                  color: "#a0a0a0",
                }}
              >
                {p.data?.propertyType || 'N/A'} Property
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  marginBottom: "15px",
                }}
              >
                <span
                  style={{
                    backgroundColor: getStatusColor(p.data?.status || 'Unknown'),
                    color: "#000000",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  {p.data?.status || 'Unknown'}
                </span>
                <span style={{ color: "#a0a0a0", fontSize: "14px" }}>
                  Last updated: {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <div style={{ display: "flex", gap: "30px", fontSize: "14px" }}>
                <div>
                  <span style={{ color: "#a0a0a0" }}>Target Amount: </span>
                  <span style={{ color: "#ffffff", fontWeight: "600" }}>
                    {p.data?.targetAmount ? formatCurrency(p.data.targetAmount) : 'N/A'}
                  </span>
                </div>
                <div>
                  <span style={{ color: "#a0a0a0" }}>Occupancy: </span>
                  <span
                    style={{
                      color: getROIColor(parseFloat(p.data?.occupancy || 0)),
                      fontWeight: "600",
                    }}
                  >
                    {p.data?.occupancy || 'N/A'}
                  </span>
                </div>
                <div>
                  <span style={{ color: "#a0a0a0" }}>Expected ROI: </span>
                  <span
                    style={{ color: getROIColor(p.data?.roi || 0), fontWeight: "600" }}
                  >
                    {p.data?.roi || 'N/A'}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Property Information Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "30px",
              marginBottom: "40px",
            }}
          >
            {/* Location & Property Details */}
            <div>
              <h3
                style={{
                  margin: "0 0 20px 0",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#ffffff",
                }}
              >
                Location & Property Details
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <MapPin size={18} style={{ color: "#a0a0a0" }} />
                  <span>{p.address || p.data?.address || 'N/A'}</span>
                </div>
                <div style={{ paddingLeft: "30px", color: "#a0a0a0", fontSize: "14px" }}>
                  {p.data?.state || 'N/A'}, {p.country || p.data?.country || 'N/A'} {p.data?.postalCode || ''}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <Building size={18} style={{ color: "#a0a0a0" }} />
                  <span>
                    Built in {p.data?.yearBuilt || 'N/A'} • {p.data?.size || 'N/A'}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <Home size={18} style={{ color: "#a0a0a0" }} />
                  <span>Owned by {p.data?.ownerEntity || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div>
              <h3
                style={{
                  margin: "0 0 20px 0",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#ffffff",
                }}
              >
                Financial Information
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <DollarSign size={18} style={{ color: "#a0a0a0" }} />
                  <span>
                    Annual Rental Income: {p.data?.rentalIncome ? formatCurrency(p.data.rentalIncome) : 'N/A'}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <TrendingUp size={18} style={{ color: "#a0a0a0" }} />
                  <span>
                    Min Investment: {p.data?.minInvestment ? formatCurrency(p.data.minInvestment) : 'N/A'}
                  </span>
                </div>
                <div style={{ paddingLeft: "30px", color: "#a0a0a0", fontSize: "14px" }}>
                  Max Investment: {p.data?.maxInvestment ? formatCurrency(p.data.maxInvestment) : 'N/A'}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <FileText size={18} style={{ color: "#a0a0a0" }} />
                  <span>Sale Fee: {p.data?.saleFee || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tokenization Details */}
          <div style={{ marginBottom: "30px" }}>
            <h3
              style={{
                margin: "0 0 20px 0",
                fontSize: "18px",
                fontWeight: "600",
                color: "#ffffff",
              }}
            >
              Tokenization Details
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "20px",
                padding: "20px",
                backgroundColor: "#262626",
                borderRadius: "8px",
              }}
            >
              <div>
                <div style={{ color: "#a0a0a0", fontSize: "12px", marginBottom: "5px" }}>
                  Total Token Supply
                </div>
                <div style={{ fontSize: "16px", fontWeight: "600" }}>
                  {parseInt(p.data?.totalTokenSupply || 0, 10).toLocaleString()}
                </div>
              </div>
              <div>
                <div style={{ color: "#a0a0a0", fontSize: "12px", marginBottom: "5px" }}>
                  Tokenized Percentage
                </div>
                <div style={{ fontSize: "16px", fontWeight: "600" }}>
                  {p.data?.tokenizedPercentage || 'N/A'}
                </div>
              </div>
              <div>
                <div style={{ color: "#a0a0a0", fontSize: "12px", marginBottom: "5px" }}>
                  Vesting Period
                </div>
                <div style={{ fontSize: "16px", fontWeight: "600" }}>
                  {p.data?.vestingPeriod || 'N/A'}
                </div>
              </div>
              <div>
                <div style={{ color: "#a0a0a0", fontSize: "12px", marginBottom: "5px" }}>
                  KYC Type
                </div>
                <div style={{ fontSize: "16px", fontWeight: "600" }}>
                  {p.data?.kycType || 'N/A'}
                </div>
              </div>
            </div>
          </div>

          {/* Description & Leasing */}
          <div>
            <h3
              style={{
                margin: "0 0 15px 0",
                fontSize: "18px",
                fontWeight: "600",
                color: "#ffffff",
              }}
            >
              Property Description
            </h3>
            <p
              style={{
                margin: "0 0 20px 0",
                lineHeight: "1.6",
                color: "#d0d0d0",
              }}
            >
              {p.data?.description || 'No description available.'}
            </p>

            <div style={{ marginBottom: "20px" }}>
              <h4 style={{ margin: "0 0 10px 0", fontSize: "16px", fontWeight: "600" }}>
                Leasing Information
              </h4>
              <p style={{ margin: 0, color: "#d0d0d0" }}>
                {p.data?.majorLeases || 'No leasing information available.'}
              </p>
            </div>

            <div>
              <h4 style={{ margin: "0 0 10px 0", fontSize: "16px", fontWeight: "600" }}>
                Valuation
              </h4>
              <p style={{ margin: 0, color: "#d0d0d0" }}>
                Valued by: {p.data?.valuerName || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
