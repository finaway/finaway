package sqlutil

import (
	"finaway/internal/util/errorutil"

	"gorm.io/gorm"
)

func CommitOrRollback(tx *gorm.DB) {
	err := recover()

	if err != nil {
		errRollback := tx.Rollback().Error
		errorutil.PanicIfError(errRollback)
		panic(err)
	} else {
		errCommit := tx.Commit().Error
		errorutil.PanicIfError(errCommit)
	}
}
