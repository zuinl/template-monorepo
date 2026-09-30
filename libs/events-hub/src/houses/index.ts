enum HousesEvent {
  HOUSE_SELECT = "HOUSE_SELECT",
}

type HouseSelectListener = (e: CustomEvent) => void;

const subscribeToHouseSelect = (listener: HouseSelectListener) => {
  window.addEventListener(HousesEvent.HOUSE_SELECT, listener as EventListener);
};

const unsubscribeFromHouseSelect = (listener: HouseSelectListener) => {
  window.removeEventListener(HousesEvent.HOUSE_SELECT, listener as EventListener);
};

const publishToHouseSelect = (selectedHouse: string) => {
  window.dispatchEvent(new CustomEvent(HousesEvent.HOUSE_SELECT, { detail: selectedHouse }));
};

export { subscribeToHouseSelect, unsubscribeFromHouseSelect, publishToHouseSelect };
