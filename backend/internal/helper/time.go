package helper

import "time"

// reference: https://gobyexample.com/epoch
func TimeToEpoch(t time.Time) uint64 {
	nanos := t.UnixNano()
	millis := nanos / 1000000

	return uint64(millis)
}
