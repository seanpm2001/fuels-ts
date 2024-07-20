contract;

// #region create-fuels-counter-guide-abi
// The abi defines the blueprint for the contract.
abi Counter {
    #[storage(read)]
    fn get_count() -> u64;

    #[storage(write, read)]
    fn increment_counter(amount: u64) -> u64;

    #[storage(read, write)]
    fn decrement_counter(amount: u64) -> u64;
}
// #endregion create-fuels-counter-guide-abi

/// The storage variables for the contract.
/// In this case, there is only one variable called `counter` which is initialized to 0.
storage {
    counter: u64 = 0,
}

// #region create-fuels-counter-guide-impl
impl Counter for Contract {
    // The `get_count` function returns the current value of the counter.
    #[storage(read)]
    fn get_count() -> u64 {
        storage.counter.read()
    }

    // The `increment_counter` function increments the counter by the given amount.
    #[storage(write, read)]
    fn increment_counter(amount: u64) -> u64 {
        let current = storage.counter.read();
        storage.counter.write(current + amount);
        storage.counter.read()
    }

    // The `decrement_counter` function decrements the counter by the given amount.
    #[storage(read, write)]
    fn decrement_counter(amount: u64) -> u64 {
        let current = storage.counter.read();
        storage.counter.write(current - amount);
        storage.counter.read()
    }
}
// #endregion create-fuels-counter-guide-impl
