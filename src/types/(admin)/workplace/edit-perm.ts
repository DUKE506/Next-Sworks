export class EditPerm {
  permMachine: boolean;
  permElectronic: boolean;
  permLift: boolean;
  permFire: boolean;
  permConstruct: boolean;
  permNetwork: boolean;
  permBeauty: boolean;
  permSecurity: boolean;
  permVoc: boolean;

  constructor({
    permMachine,
    permElectronic,
    permLift,
    permFire,
    permConstruct,
    permNetwork,
    permBeauty,
    permSecurity,
    permVoc,
  }: {
    permMachine: boolean;
    permElectronic: boolean;
    permLift: boolean;
    permFire: boolean;
    permConstruct: boolean;
    permNetwork: boolean;
    permBeauty: boolean;
    permSecurity: boolean;
    permVoc: boolean;
  }) {
    this.permMachine = permMachine;
    this.permElectronic = permElectronic;
    this.permLift = permLift;
    this.permFire = permFire;
    this.permConstruct = permConstruct;
    this.permNetwork = permNetwork;
    this.permBeauty = permBeauty;
    this.permSecurity = permSecurity;
    this.permVoc = permVoc;
  }
}
