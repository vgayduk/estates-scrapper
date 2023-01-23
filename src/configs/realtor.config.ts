import { EPROPERTIES } from 'src/enums/esstateProperties.enum';

export const realtorDataConfig = [
  {
    key: EPROPERTIES.PRICE,
    selector: '#listingPriceValue',
  },
  {
    key: EPROPERTIES.ADDRESS,
    selector: '#listingAddress',
  },
  {
    key: EPROPERTIES.MLS_NUMBER,
    selector: '#MLNumberVal',
  },
  {
    key: EPROPERTIES.BEDROOMS_COUNT,
    selector: '#BedroomIcon .listingIconNum',
  },
  {
    key: EPROPERTIES.BATHROOMS_COUNT,
    selector: '#BathroomIcon .listingIconNum',
  },
  {
    key: EPROPERTIES.DESCRIPTION,
    selector: '#propertyDescriptionCon',
  },
  {
    key: EPROPERTIES.PROPERTY_TYPE,
    selector:
      '#propertyDetailsSectionContentSubCon_PropertyType .propertyDetailsSectionContentValue',
  },
  {
    key: EPROPERTIES.BUILDING_TYPE,
    selector:
      '#propertyDetailsSectionContentSubCon_BuildingType .propertyDetailsSectionContentValue',
  },
  {
    key: EPROPERTIES.SQUARE_FOOTAGE,
    selector:
      '#propertyDetailsSectionContentSubCon_SquareFootage .propertyDetailsSectionContentValue',
  },
  {
    key: EPROPERTIES.NEIGHBORHOOD_NAME,
    selector:
      '#propertyDetailsSectionContentSubCon_NeighborhoodName .propertyDetailsSectionContentValue',
  },
  {
    key: EPROPERTIES.TITLE,
    selector:
      '#propertyDetailsSectionContentSubCon_Title .propertyDetailsSectionContentValue',
  },
  {
    key: EPROPERTIES.LAND_SIZE,
    selector:
      '#propertyDetailsSectionContentSubCon_LandSize .propertyDetailsSectionContentValue',
  },
  {
    key: EPROPERTIES.BUILT_IN,
    selector:
      '#propertyDetailsSectionContentSubCon_BuiltIn .propertyDetailsSectionContentValue',
  },
  {
    key: EPROPERTIES.ANNUAL_PROPERTY_TAXES,
    selector:
      '#propertyDetailsSectionContentSubCon_AnnualPropertyTaxes .propertyDetailsSectionContentValue',
  },
  {
    key: EPROPERTIES.PARKING_TYPE,
    selector:
      '#propertyDetailsSectionContentSubCon_ParkingType .propertyDetailsSectionContentValue',
  },
  {
    key: EPROPERTIES.TIME_ON_PLATFORM,
    selector:
      '#propertyDetailsSectionContentSubCon_TimeOnRealtor .propertyDetailsSectionContentValue',
  },
  {
    key: EPROPERTIES.INTERiOR_FEATURES,
    selector:
      '#propertyDetailsBuilding_InteriorFeatures .propertyDetailsSectionContentValue',
  },
  {
    key: EPROPERTIES.BUILDING_FEATURES,
    selector:
      '#propertyDetailsSectionVal_Features #propertyDetailsBuilding_BuildingFeatures .propertyDetailsSectionContentValue',
  },
  {
    key: EPROPERTIES.ARCHITECTURAL_STYLE,
    selector:
      '#propertyDetailsSectionVal_ArchitecturalStyle .propertyDetailsSectionContentValue',
  },
  {
    key: EPROPERTIES.SRTUCTURES,
    selector:
      '#propertyDetailsSectionVal_Structures .propertyDetailsSectionContentValue',
  },
];
