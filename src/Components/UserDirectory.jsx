import React, { useEffect, useState } from 'react';
import { ArrowLeft, Star, MapPin, Building, Calendar, DollarSign, Users, FileText, Home, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import PropertyDetail from './PropertyDetail';

const PropertyDirectory = () => {
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [properties, setProperties] = useState(null);
    const [favorites, setFavorites] = useState(new Set());

    // Mock property data based on your form structure
    // const properties = [
    //     {
    //         id: 1,
    //         name: "Marina Bay Luxury Apartments",
    //         propertyType: "Residential",
    //         address: "123 Marina Boulevard",
    //         country: "Singapore",
    //         state: "Central Region",
    //         postalCode: "018956",
    //         yearBuilt: "2019",
    //         size: "15,000 sqft",
    //         photos: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=200&fit=crop"],
    //         description: "Premium waterfront residential complex with stunning marina views and world-class amenities.",
    //         ownerEntity: "Marina Properties Pte Ltd",
    //         valuerName: "Knight Frank Singapore",
    //         rentalIncome: "850,000",
    //         occupancy: "95%",
    //         majorLeases: "3 major tenants with 5-year leases",
    //         targetAmount: "5,000,000",
    //         minInvestment: "1,000",
    //         maxInvestment: "100,000",
    //         totalTokenSupply: "5,000,000",
    //         tokenizedPercentage: "60%",
    //         saleFee: "2.5%",
    //         vestingPeriod: "12 months",
    //         kycType: "Enhanced",
    //         kycDetails: "Verified with full documentation",
    //         consent: true,
    //         status: "Active",
    //         lastUpdated: "2 hours ago",
    //         roi: 12.5
    //     },
    //     {
    //         id: 2,
    //         name: "Downtown Office Tower",
    //         propertyType: "Commercial",
    //         address: "456 Business District Ave",
    //         country: "United States",
    //         state: "California",
    //         postalCode: "90210",
    //         yearBuilt: "2021",
    //         size: "45,000 sqft",
    //         photos: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop"],
    //         description: "Modern Grade A office building in the heart of downtown financial district.",
    //         ownerEntity: "Downtown Realty Corp",
    //         valuerName: "CBRE Valuation",
    //         rentalIncome: "2,400,000",
    //         occupancy: "88%",
    //         majorLeases: "Tech companies with 7-year agreements",
    //         targetAmount: "15,000,000",
    //         minInvestment: "5,000",
    //         maxInvestment: "500,000",
    //         totalTokenSupply: "15,000,000",
    //         tokenizedPercentage: "75%",
    //         saleFee: "3.0%",
    //         vestingPeriod: "18 months",
    //         kycType: "Standard",
    //         kycDetails: "Basic verification completed",
    //         consent: true,
    //         status: "Funding",
    //         lastUpdated: "5 minutes ago",
    //         roi: 8.7
    //     },
    //     {
    //         id: 3,
    //         name: "Retail Shopping Complex",
    //         propertyType: "Retail",
    //         address: "789 Shopping Center Blvd",
    //         country: "United Kingdom",
    //         state: "England",
    //         postalCode: "SW1A 1AA",
    //         yearBuilt: "2020",
    //         size: "75,000 sqft",
    //         photos: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop"],
    //         description: "Prime retail destination with anchor stores and diverse tenant mix.",
    //         ownerEntity: "UK Retail Holdings Ltd",
    //         valuerName: "JLL Property Consultants",
    //         rentalIncome: "3,200,000",
    //         occupancy: "92%",
    //         majorLeases: "Major retail brands with long-term commitments",
    //         targetAmount: "25,000,000",
    //         minInvestment: "2,500",
    //         maxInvestment: "250,000",
    //         totalTokenSupply: "25,000,000",
    //         tokenizedPercentage: "80%",
    //         saleFee: "2.0%",
    //         vestingPeriod: "24 months",
    //         kycType: "Enhanced",
    //         kycDetails: "Full due diligence completed",
    //         consent: true,
    //         status: "Completed",
    //         lastUpdated: "1 day ago",
    //         roi: 10.2
    //     },
    //     {
    //         id: 4,
    //         name: "Industrial Warehouse",
    //         propertyType: "Industrial",
    //         address: "321 Logistics Park Way",
    //         country: "Germany",
    //         state: "Bavaria",
    //         postalCode: "80331",
    //         yearBuilt: "2018",
    //         size: "120,000 sqft",
    //         photos: ["https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&h=200&fit=crop"],
    //         description: "Strategic logistics hub with excellent transportation connectivity.",
    //         ownerEntity: "European Logistics GmbH",
    //         valuerName: "Cushman & Wakefield",
    //         rentalIncome: "1,800,000",
    //         occupancy: "100%",
    //         majorLeases: "Single tenant - 15-year lease agreement",
    //         targetAmount: "12,000,000",
    //         minInvestment: "10,000",
    //         maxInvestment: "1,000,000",
    //         totalTokenSupply: "12,000,000",
    //         tokenizedPercentage: "70%",
    //         saleFee: "2.5%",
    //         vestingPeriod: "36 months",
    //         kycType: "Standard",
    //         kycDetails: "Standard verification process",
    //         consent: true,
    //         status: "Active",
    //         lastUpdated: "3 hours ago",
    //         roi: 15.1
    //     },
    //     {
    //         id: 5,
    //         name: "Luxury Hotel Resort",
    //         propertyType: "Hospitality",
    //         address: "555 Beach Resort Drive",
    //         country: "Thailand",
    //         state: "Phuket",
    //         postalCode: "83000",
    //         yearBuilt: "2022",
    //         size: "200,000 sqft",
    //         photos: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop"],
    //         description: "Exclusive beachfront resort with premium amenities and world-class service.",
    //         ownerEntity: "Tropical Hospitality Co Ltd",
    //         valuerName: "Colliers International",
    //         rentalIncome: "8,500,000",
    //         occupancy: "78%",
    //         majorLeases: "Hotel management contract - 20 years",
    //         targetAmount: "50,000,000",
    //         minInvestment: "25,000",
    //         maxInvestment: "2,500,000",
    //         totalTokenSupply: "50,000,000",
    //         tokenizedPercentage: "65%",
    //         saleFee: "3.5%",
    //         vestingPeriod: "12 months",
    //         kycType: "Enhanced",
    //         kycDetails: "Comprehensive background checks completed",
    //         consent: true,
    //         status: "Coming Soon",
    //         lastUpdated: "1 hour ago",
    //         roi: 11.8
    //     }
    // ];

    useEffect(() => {
        const API = "https://4br9gafbh5.execute-api.eu-north-1.amazonaws.com/prod/api/forms";
        fetch(API)
            .then(response => response.json())
            .then(data => {
                // console.log("res",JSON.stringify(data));

                setProperties(data?.items || []);
                console.log("Fetched data:", data);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    const toggleFavorite = (propertyId) => {
        const newFavorites = new Set(favorites);
        if (newFavorites.has(propertyId)) {
            newFavorites.delete(propertyId);
        } else {
            newFavorites.add(propertyId);
        }
        setFavorites(newFavorites);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return '#22c55e';
            case 'Funding': return '#3b82f6';
            case 'Completed': return '#8b5cf6';
            case 'Coming Soon': return '#f59e0b';
            default: return '#6b7280';
        }
    };

    const getROIColor = (roi) => {
        if (roi >= 12) return '#22c55e';
        if (roi >= 8) return '#f59e0b';
        return '#ef4444';
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    if (selectedProperty) {
        return (
            <PropertyDetail
                property={selectedProperty}
                onBack={() => setSelectedProperty(null)}
                getStatusColor={(s) => (s === "Active" ? "#2ee585" : "#f5c84b")}
                getROIColor={(n) => (n > 8 ? "#56c2ff" : "#ff6b81")}
                formatCurrency={(n) => new Intl.NumberFormat("en-AE", { style: "currency", currency: "AED" }).format(n)}
            />
        );
    }

    return (
        <div style={{
            backgroundColor: '#0a0a0a',
            color: '#ffffff',
            minHeight: '100vh',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
            {/* Header */}
            <div style={{
                backgroundColor: '#1a1a1a',
                padding: '20px 40px',
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid #333333'
            }}>
                <Link to="/" style={{ textDecoration: 'none', fontSize: '24px', color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ArrowLeft size={20} />Home</Link>
                <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>Tokenized Properties</h1>
            </div>

            {/* Table */}
            <div style={{ padding: '20px' }}>
                <div style={{
                    backgroundColor: '#1a1a1a',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid #333333'
                }}>
                    {/* Table Header */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '50px 1fr 120px 120px 100px 120px 80px 100px',
                        padding: '16px 20px',
                        backgroundColor: '#262626',
                        borderBottom: '1px solid #333333',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#a0a0a0',
                        textTransform: 'uppercase'
                    }}>
                        <div></div>
                        <div>PROPERTY</div>
                        <div>TYPE</div>
                        <div>STATUS</div>
                        <div>OCCUPANCY</div>
                        <div>TARGET AMOUNT</div>
                        <div>ROI</div>
                        <div>LOCATION</div>
                    </div>

                    {/* Table Rows */}
                    {properties?.map((property) => (
                        <div
                            key={property.id}
                            onClick={() => setSelectedProperty(property)}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '50px 1fr 120px 120px 100px 120px 80px 100px',
                                padding: '16px 20px',
                                borderBottom: '1px solid #333333',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                alignItems: 'center'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#262626';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(property.id);
                                    }}
                                    style={{
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: favorites.has(property.id) ? '#fbbf24' : '#6b7280'
                                    }}
                                >
                                    <Star size={16} fill={favorites.has(property.id) ? '#fbbf24' : 'transparent'} />
                                </button>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <img
                                    src={property.data?.photos?.[0] || '/placeholder-image.jpg'}
                                    alt={property.name}
                                    style={{
                                        width: '50px',
                                        height: '35px',
                                        borderRadius: '6px',
                                        objectFit: 'cover'
                                    }}
                                />
                                <div>
                                    <div style={{ fontWeight: '600', marginBottom: '2px' }}>{property.name}</div>
                                    <div style={{ fontSize: '12px', color: '#a0a0a0' }}>{property.data?.size || 'N/A'}</div>
                                </div>
                            </div>

                            <div style={{ fontSize: '14px' }}>{property.data?.propertyType || 'N/A'}</div>

                            <div>
                                <span style={{
                                    backgroundColor: getStatusColor(property.data?.status || 'Unknown'),
                                    color: '#000000',
                                    padding: '2px 8px',
                                    borderRadius: '12px',
                                    fontSize: '12px',
                                    fontWeight: '600'
                                }}>
                                    {property.data?.status || 'Unknown'}
                                </span>
                            </div>

                            <div style={{ fontSize: '14px', fontWeight: '600' }}>
                                {property.data?.occupancy || 'N/A'}
                            </div>

                            <div style={{ fontSize: '14px', fontWeight: '600' }}>
                                {property.data?.targetAmount ?
                                    `${formatCurrency(parseInt(property.data.targetAmount) / 1000)}K` :
                                    'N/A'
                                }
                            </div>

                            <div style={{
                                color: getROIColor(property.data?.roi || 0),
                                fontSize: '14px',
                                fontWeight: '600'
                            }}>
                                {property.data?.roi || 'N/A'}%
                            </div>

                            <div style={{ fontSize: '12px', color: '#a0a0a0' }}>
                                {property.country}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PropertyDirectory;