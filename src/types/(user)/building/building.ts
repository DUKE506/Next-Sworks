import { Floor } from "../floor/floor";
import { Room } from "../room/room";

export class Building {
  id: number;
  name: string;
  address: string;
  tel: string;
  usage: string;
  constructionCo: string;
  completionDt: Date;
  //구조
  buildingStruct: string;
  roofStruct: string;

  //면적
  //연면적
  grossFloorArea: string;
  //대지면적
  siteArea: string;
  //건축면적
  buildingArea: string;

  //층
  //층수
  totalFloor: string;
  //지상
  groundFloor: string;
  //지하
  basementFloor: string;

  //높이
  //전체높이
  totalHeight: string;
  //지상
  groundHeight: string;
  //지하
  basementHeight: string;

  //주차
  //전체
  totalParking: string;
  //옥내
  indoorParking: string;
  //옥외
  outdoorParking: string;

  //전기
  //전기용량
  electricalCapacity: string;
  //수전용량
  receivingCapacity: string;
  //발전용량
  powerCapacity: string;

  //급수
  //급수용량
  waterCapacity: string;
  //고가수조
  elevatedWaterTankCapacity: string;
  //저수조
  waterTankCapacity: string;

  //가스
  //가스용량
  gasCapacity: string;
  //보일러
  heater: string;
  //냉온수기
  chillerHeater: string;

  //승강기
  //전체
  totalLift: string;
  //인승용
  passengerLift: string;
  //화물용
  FreightLift: string;

  //냉난방
  //냉난방용량
  coolHeatCapacity: string;
  //난방용량
  heatCapacity: string;
  //냉방용량
  coolCapacity: string;

  //조경면적
  //전체
  totalLandscapeArea: string;
  //지상
  groundLandscapeArea: string;
  //지하
  basementLandscapeArea: string;

  //화장실
  //전체
  totalRestroom: string;
  //남자
  mensRoom: string;
  //여자
  ladiesRoom: string;

  //소방등급
  fireRating: string;
  //정화조용량
  cesspoolCapacity: string;

  //층
  floors: Floor[];

  constructor(data: Partial<Building> = {}) {
    this.id = data.id ?? 0;
    this.name = data.name ?? "";
    this.address = data.address ?? "";
    this.tel = data.tel ?? "";
    this.usage = data.usage ?? "";
    this.constructionCo = data.constructionCo ?? "";
    this.completionDt = data.completionDt ?? new Date();

    this.buildingStruct = data.buildingStruct ?? "";
    this.roofStruct = data.roofStruct ?? "";

    this.grossFloorArea = data.grossFloorArea ?? "";
    this.siteArea = data.siteArea ?? "";
    this.buildingArea = data.buildingArea ?? "";

    this.totalFloor = data.totalFloor ?? "";
    this.groundFloor = data.groundFloor ?? "";
    this.basementFloor = data.basementFloor ?? "";

    this.totalHeight = data.totalHeight ?? "";
    this.groundHeight = data.groundHeight ?? "";
    this.basementHeight = data.basementHeight ?? "";

    this.totalParking = data.totalParking ?? "";
    this.indoorParking = data.indoorParking ?? "";
    this.outdoorParking = data.outdoorParking ?? "";

    this.electricalCapacity = data.electricalCapacity ?? "";
    this.receivingCapacity = data.receivingCapacity ?? "";
    this.powerCapacity = data.powerCapacity ?? "";

    this.waterCapacity = data.waterCapacity ?? "";
    this.elevatedWaterTankCapacity = data.elevatedWaterTankCapacity ?? "";
    this.waterTankCapacity = data.waterTankCapacity ?? "";

    this.gasCapacity = data.gasCapacity ?? "";
    this.heater = data.heater ?? "";
    this.chillerHeater = data.chillerHeater ?? "";

    this.totalLift = data.totalLift ?? "";
    this.passengerLift = data.passengerLift ?? "";
    this.FreightLift = data.FreightLift ?? "";

    this.coolHeatCapacity = data.coolHeatCapacity ?? "";
    this.heatCapacity = data.heatCapacity ?? "";
    this.coolCapacity = data.coolCapacity ?? "";

    this.totalLandscapeArea = data.totalLandscapeArea ?? "";
    this.groundLandscapeArea = data.groundLandscapeArea ?? "";
    this.basementLandscapeArea = data.basementLandscapeArea ?? "";

    this.totalRestroom = data.totalRestroom ?? "";
    this.mensRoom = data.mensRoom ?? "";
    this.ladiesRoom = data.ladiesRoom ?? "";

    this.fireRating = data.fireRating ?? "";
    this.cesspoolCapacity = data.cesspoolCapacity ?? "";

    this.floors = data.floors ?? [];
  }
}

export class BuildingName {
  id: number;
  name: string;
  constructor({ id, name }: { id: number; name: string }) {
    this.id = id;
    this.name = name;
  }
}
